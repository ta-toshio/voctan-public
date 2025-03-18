from celery import shared_task

from models import DocumentModel


@shared_task(ignore_result=False)
def add_together(a: int, b: int) -> int:
    return a + b


# @shared_task(ignore_result=False)
def get_db_data(document_id: str) -> str:
    d = DocumentModel.query.get(document_id)
    return d.as_str()
