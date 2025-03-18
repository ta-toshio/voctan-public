from sqlalchemy.dialects.postgresql import UUID
import uuid6

from db import db


class EmailVerificationModel(db.Model):
    __tablename__ = "email_verification"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid6.uuid7, nullable=False)
    email = db.Column(db.String(255), unique=False, nullable=False)
    name = db.Column(db.String(255), nullable=True)
    password = db.Column(db.String(256), nullable=False)
    token = db.Column(db.String(500), unique=True, nullable=False)
    expired_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
