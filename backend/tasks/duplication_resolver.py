from celery import shared_task

from db import db
from domains.document import create_document_import_error, mark_document_status_finished
from models import DocumentImportStatusModel, DocumentWordModel, ChapterModel, WordModel


@shared_task(ignore_result=False)
def duplication_resolver(document_id: str):
    print(f"--------------duplication_resolver {document_id}", document_id)

    document_import_status = db.session.execute(
        db.select(
            DocumentImportStatusModel
        ).filter_by(
            document_id=document_id
        )
    ).scalar_one_or_none()

    if not document_import_status:
        create_document_import_error(document_id, "document_import_status not found")
        return

    if document_import_status.total_steps == 1:
        return

    if document_import_status.progress_webhook != document_import_status.total_steps:
        return

    word_set = set()
    duplicate_words = []
    for document_words_batch in fetch_document_words_in_batches(document_id):
        for document_word in document_words_batch:
            word_id = document_word.word_id
            if word_id in word_set:
                duplicate_words.append(document_word)

            word_set.add(word_id)

    print("-------------len(duplicate_words)")
    print(len(duplicate_words))

    if len(duplicate_words) > 0:
        for duplicate_word in duplicate_words:
            duplicate_word.duplication = True
        db.session.commit()

    mark_document_status_finished(document_id)


def fetch_document_words_in_batches(document_id: str, batch_size: int = 200):
    offset = 0

    while True:
        document_words_batch = db.session.execute(
            db.select(DocumentWordModel)
            .filter_by(document_id=document_id)
            .join(
                ChapterModel,
                DocumentWordModel.chapter_id == ChapterModel.id
            )
            .order_by(
                ChapterModel.index.asc(),
                DocumentWordModel.index.asc()
            )
            .limit(batch_size)
            .offset(offset)
        ).scalars().all()

        if not document_words_batch:
            break

        yield document_words_batch
        offset += batch_size
