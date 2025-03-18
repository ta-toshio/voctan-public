import os
import uuid
from datetime import datetime, timezone

from db import db
from models.document import DocumentType
from models.document_import_status import DocumentStatus
from utils.boto3_client import boto3_factory
from models import DocumentModel, DocumentImportStatusModel, DocumentImportErrorModel


def issue_upload_presigned_url() -> str | None:
    try:
        date = datetime.now(timezone.utc).strftime('%Y-%m-%d')

        s3_file_path = f"documents/{date}/{uuid.uuid4()}"

        return boto3_factory('s3').generate_presigned_url(
            'put_object',
            Params={
                'Bucket': os.getenv('BUCKET_NAME'),
                'Key': s3_file_path,
                'ContentType': 'application/pdf',
                'ContentLength': 100 * 1024 * 1024  # 100MB
            },
            ExpiresIn=3600
        )

    except Exception as e:
        print(e)
        return None


def document_factory(
        user_id: str,
        document_type: DocumentType,
        name: str,
        description: str = ""
) -> DocumentModel:
    if not user_id:
        raise ValueError("user_id is required")
    if not name:
        raise ValueError("name is required")

    return DocumentModel(**{
        "user_id": user_id,
        "type": document_type,
        "name": name,
        "description": description,
    })


def document_import_status_factory(
        document_id: str,
        file_path: str = "",
        status: DocumentStatus = DocumentStatus.PENDING,
        progress: int = 0,
        total_steps: int = 1,
) -> DocumentImportStatusModel:
    return DocumentImportStatusModel(**{
        "document_id": document_id,
        "file_path": file_path,
        "status": status,
        "progress": progress,
        "total_steps": total_steps,
    })


def create_document_import_error(
        document_id: str,
        error_message: str,
        chapter_id: str | None = None,
):
    document_import_error = DocumentImportErrorModel(
        document_id=document_id,
        message=error_message,
        chapter_id=chapter_id,
    )
    db.session.add(document_import_error)

    document_import_status = db.session.execute(
        db.select(DocumentImportStatusModel).filter_by(document_id=document_id)
    ).scalar_one()
    document_import_status.status = DocumentStatus.FAILED
    db.session.commit()


def mark_document_status_finished(document_id: str, progress_webhook: int | None = None):
    document_import_status = db.session.execute(
        db.select(
            DocumentImportStatusModel
        ).filter_by(
            document_id=document_id
        )
    ).scalar_one_or_none()
    if not document_import_status:
        return

    if progress_webhook is not None:
        document_import_status.progress_webhook = progress_webhook
    document_import_status.status = DocumentStatus.COMPLETED
    db.session.commit()
