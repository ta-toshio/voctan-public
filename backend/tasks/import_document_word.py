import json
import os
from typing import List

from celery import shared_task

from db import db
from domains.document import create_document_import_error, mark_document_status_finished
from domains.document_word import find_word
from models import DocumentWordModel, ChapterModel
from models.document import DocumentType
from usecases.duplication_task_register import duplication_task_register
from utils.boto3_client import boto3_factory


@shared_task(ignore_result=False)
def import_document_word(
        document_type: DocumentType,
        document_id: str,
        chapter_index: int,
        chapter_count: int,
        has_chapter: bool,
):
    chapter_id = None
    s3_client = boto3_factory('s3')

    if document_type == DocumentType.BOOK:
        key = f"document/{document_id}/{chapter_index}/"
    else:
        key = f"document/{document_id}/"

    try:
        if has_chapter:
            chapter = db.session.execute(
                db.select(
                    ChapterModel
                ).filter_by(
                    document_id=document_id,
                    index=chapter_index
                )
            ).scalar_one_or_none()

            if chapter is not None:
                chapter_id = chapter.id

        response = s3_client.get_object(
            Bucket=os.getenv('WORD_BUCKET_NAME'),
            Key=key + "words.json",
        )

        words = json.loads(response['Body'].read().decode('utf-8'))

        document_words: List[DocumentWordModel] = []
        not_found_word = set()
        word_index = 0

        for idx, word in enumerate(words):
            word_entity = find_word(word["lemma"], word["raw"])
            if not word_entity:
                not_found_word.add(word["raw"])
                continue

            document_word = DocumentWordModel(
                document_id=document_id,
                word_id=word_entity.id,
                index=word_index,
                chapter_id=chapter_id,
                word_raw=word["raw"],
                example=word["sentence"],
                duplication=False,
            )

            document_words.append(document_word)
            word_index += 1

        db.session.bulk_save_objects(document_words)
        db.session.commit()

    except Exception as e:
        create_document_import_error(document_id, str(e), chapter_id)
        return

    for file_path in ["body.txt", "sentences.json", "words.json"]:
        s3_client.delete_object(
            Bucket=os.getenv('WORD_BUCKET_NAME'),
            Key=key + file_path
        )

    if not has_chapter or chapter_count == 1:
        mark_document_status_finished(document_id, progress_webhook=1)
        return

    # chapterが複数ある場合は、
    # 単語の重複登録を解決するためのタスクを登録する
    duplication_task_register(document_id)

