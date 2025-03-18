from sqlalchemy.dialects.postgresql import UUID
import uuid6

from db import db


class UserCredentialModel(db.Model):
    __tablename__ = "user_credential"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid6.uuid7, nullable=False)
    user_id = db.Column(UUID(as_uuid=True), db.ForeignKey("user.id", ondelete="CASCADE"), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
