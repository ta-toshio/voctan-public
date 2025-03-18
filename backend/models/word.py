from sqlalchemy.dialects.postgresql import UUID
import uuid6

from db import db


class WordModel(db.Model):
    __tablename__ = "word"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid6.uuid7, nullable=False)
    word = db.Column(db.String(80), unique=False, nullable=False)
    mean = db.Column(db.Text)
    level = db.Column(db.SmallInteger, nullable=False, default=0, server_default="0")
    grade = db.Column(db.SmallInteger, nullable=False, default=0, server_default="0")

    # document_words = db.relationship("DocumentWordModel", back_populates="word", lazy="noload")
