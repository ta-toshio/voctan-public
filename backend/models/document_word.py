from sqlalchemy import Boolean, String
from sqlalchemy.dialects.postgresql import UUID
import uuid6

from db import db


class DocumentWordModel(db.Model):
    __tablename__ = "document_word"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid6.uuid7, nullable=False)
    document_id = db.Column(UUID(as_uuid=True), db.ForeignKey("document.id", ondelete="CASCADE"), unique=False, nullable=False)
    word_id = db.Column(UUID(as_uuid=True), db.ForeignKey("word.id"), unique=False, nullable=True)
    my_word = db.Column(String(80), unique=False, nullable=True)
    my_word_mean = db.Column(String(1000), unique=False, nullable=True)
    index = db.Column(db.Integer, unique=False, nullable=False, default=0, server_default="0")
    chapter_id = db.Column(UUID(as_uuid=True), db.ForeignKey("chapter.id"), unique=False, nullable=True)
    word_raw = db.Column(String(80), nullable=False)
    example = db.Column(db.Text, nullable=True)
    duplication = db.Column(Boolean, nullable=False, default=False)
    passed = db.Column(Boolean, nullable=False, default=False)
    passed_count = db.Column(db.SmallInteger, nullable=False, default=0, server_default="0")
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

    document = db.relationship("DocumentModel", back_populates="document_words", lazy="noload")
    word = db.relationship("WordModel", lazy="joined")
