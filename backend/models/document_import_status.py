from sqlalchemy.dialects.postgresql import UUID
import enum
from sqlalchemy import Enum
import uuid6

from db import db


class DocumentStatus(enum.Enum):
    PENDING = "pending"
    STARTING = "starting"
    STARTED = "started"
    PROGRESS = "progress"
    COMPLETED = "completed"
    FAILED = "failed"


class DocumentImportStatusModel(db.Model):
    __tablename__ = "document_import_status"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid6.uuid7, nullable=False)
    document_id = db.Column(UUID(as_uuid=True), db.ForeignKey("document.id", ondelete="CASCADE"), unique=True, nullable=False)
    file_path = db.Column(db.String(255), unique=False, nullable=False)
    status = db.Column(Enum(DocumentStatus), unique=False, nullable=False)
    progress = db.Column(db.Integer, default=0, unique=False, nullable=False, server_default="0")
    progress_webhook = db.Column(db.Integer, default=0, unique=False, nullable=False, server_default="0")
    total_steps = db.Column(db.Integer, unique=False, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    document = db.relationship(
        "DocumentModel",
        back_populates="document_import_status",
        uselist=False,
        lazy="joined",
    )
