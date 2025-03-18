from sqlalchemy.orm import noload

from db import db
from models import DocumentImportStatusModel
from tasks.duplication_resolver import duplication_resolver


def duplication_task_register(
        document_id: str,
):
    print("---------------duplication_task_register")
    document_import_status = db.session.execute(
        db.select(
            DocumentImportStatusModel
        ).options(
            noload(DocumentImportStatusModel.document)
        ).filter_by(
            document_id=document_id
        ).with_for_update()
    ).scalar_one_or_none()

    document_import_status.progress_webhook = document_import_status.progress_webhook + 1
    db.session.commit()

    print("---------------document_import_status.progress_webhook")
    print(document_import_status.progress_webhook)

    if document_import_status.progress_webhook == document_import_status.total_steps:
        duplication_resolver.delay(document_id)
