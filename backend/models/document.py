from sqlalchemy.dialects.postgresql import UUID
import enum
from sqlalchemy import Enum
import uuid6

from db import db


class DocumentType(str, enum.Enum):
    BOOK = "BOOK"
    VIDEO = "VIDEO"
    TEXT = "TEXT"
    WEB = "WEB"

    @staticmethod
    def to_enum(value: str):
        if value == DocumentType.BOOK.value:
            return DocumentType.BOOK
        elif value == DocumentType.VIDEO.value:
            return DocumentType.VIDEO
        elif value == DocumentType.TEXT.value:
            return DocumentType.TEXT
        elif value == DocumentType.WEB.value:
            return DocumentType.WEB
        else:
            raise ValueError(f"Invalid value: {value}")


class DocumentModel(db.Model):
    __tablename__ = "document"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid6.uuid7, nullable=False)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    type = db.Column(Enum(DocumentType), unique=False, nullable=False)
    name = db.Column(db.String(255), unique=False, nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    document_import_status = db.relationship(
        "DocumentImportStatusModel",
        back_populates="document",
        uselist=False,
        lazy="joined"
    )
    document_import_errors = db.relationship(
        "DocumentImportErrorModel",
        back_populates="document",
        uselist=True,
        lazy="noload"
    )
    chapters = db.relationship("ChapterModel", back_populates="document", lazy="dynamic")
    document_words = db.relationship("DocumentWordModel", back_populates="document", lazy="noload")

    def as_str(self):
        return f"{self.id} {self.user_id} {self.type} {self.name} {self.description} {self.created_at} {self.updated_at}"

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
