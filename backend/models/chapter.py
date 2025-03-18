from sqlalchemy import String
from sqlalchemy.dialects.postgresql import UUID
import uuid6

from db import db


class ChapterModel(db.Model):
    __tablename__ = "chapter"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid6.uuid7, nullable=False)
    document_id = db.Column(UUID(as_uuid=True), db.ForeignKey("document.id", ondelete="CASCADE"), unique=False, nullable=False)
    index = db.Column(db.SmallInteger, unique=False, nullable=False, default=0, server_default="0")
    name = db.Column(String(20), nullable=True)
    title = db.Column(String(80), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    document = db.relationship("DocumentModel", back_populates="chapters", lazy="noload")
