from sqlalchemy.dialects.postgresql import UUID
import uuid6

from db import db


class DocumentImportErrorModel(db.Model):
    __tablename__ = "document_import_error"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid6.uuid7, nullable=False)
    document_id = db.Column(UUID(as_uuid=True), db.ForeignKey("document.id", ondelete="CASCADE"), unique=False, nullable=False)
    chapter_id = db.Column(UUID(as_uuid=True), db.ForeignKey("chapter.id", ondelete="SET NULL"), unique=False, nullable=True)
    message = db.Column(db.Text, unique=False, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    document = db.relationship(
        "DocumentModel",
        back_populates="document_import_errors",
        uselist=True,
        lazy="noload",
    )
