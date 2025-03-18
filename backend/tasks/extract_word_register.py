import os
import uuid

from celery import shared_task

from db import db
from domains.chapter import chapter_factory
from domains.document import create_document_import_error
from instance.gemini import genai
from models import DocumentModel, ChapterModel
from models.document_import_status import DocumentStatus
from usecases.load_pdf_with_gemini import get_chapter, get_all_contents
from utils.aws import create_book_word_extractor_step_functions
from utils.boto3_client import boto3_factory


@shared_task(ignore_result=False)
def extract_word_register(document_id: str):
    document = DocumentModel.query.get(document_id)
    document_import_status = document.document_import_status

    document_import_status.status = DocumentStatus.STARTED
    db.session.commit()

    # document_idからファイルパスを取得
    file_path = document.document_import_status.file_path

    # s3からファイルダウンロード
    s3 = boto3_factory('s3')

    downloaded_file_path = "/tmp/" + str(uuid.uuid4()) + ".pdf"
    s3.download_file(os.getenv('PDF_BUCKET_NAME'), file_path, downloaded_file_path)

    # geminiにファイルアップロード
    genai_file = genai.upload_file(path=downloaded_file_path,
                                   display_name=os.path.basename(downloaded_file_path))
    if not genai_file:
        create_document_import_error(document_id, "failed to upload file")
        return "failed to upload file"

    document_import_status.status = DocumentStatus.PROGRESS
    db.session.commit()

    chapter = get_chapter(genai_file)
    if chapter:
        chapter_models = []
        for i, c in enumerate(chapter):
            chapter_model = chapter_factory(document_id, i, c["chapter"], c["title"])
            chapter_models.append(chapter_model)

        chapter_count = len(chapter)
        document_import_status.total_steps = chapter_count
        db.session.bulk_save_objects(chapter_models)
        db.session.commit()

        s3_client = boto3_factory('s3')

        def callback(body, chapter_index):
            try:
                s3_client.put_object(
                    Bucket=os.getenv('WORD_BUCKET_NAME'),
                    Key=f"document/{document_id}/{chapter_index}/body.txt",
                    Body=body
                )

                if chapter_index == 0 and chapter_count >= 2:
                    return

                create_book_word_extractor_step_functions(
                    body,
                    document_id,
                    str(chapter_models[chapter_index].id),
                    chapter_index,
                    chapter_count,
                    True
                )

                document_import_status.progress = chapter_index + 1
                db.session.commit()

            except Exception as e:
                print(e)
                _c = db.session.execute(db.select(ChapterModel).filter_by(
                    document_id=document_id,
                    index=chapter_index
                )).scalar_one()
                create_document_import_error(document_id, str(e), str(_c.id))

        # 本文を取得
        get_all_contents(genai_file, chapter, callback)
    else:
        def callback(body):
            try:
                s3_client.put_object(
                    Bucket=os.getenv('WORD_BUCKET_NAME'),
                    Key=f"document/{document_id}/0/body.txt",
                    Body=body
                )

                create_book_word_extractor_step_functions(
                    body,
                    document_id,
                    "",
                    0,
                    0,
                    False
                )

                document_import_status.progress = 1
                document_import_status.total_steps = 1
                db.session.commit()

            except Exception as e:
                create_document_import_error(document_id, str(e))

        get_all_contents(genai_file, None, callback)

    genai.delete_file(genai_file.name)
