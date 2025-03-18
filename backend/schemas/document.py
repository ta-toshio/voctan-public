from marshmallow import Schema, fields

from models.document import DocumentType
from models.document_import_status import DocumentStatus
from schemas.pagination import PaginationSchema


class PreSignedUrlSchema(Schema):
    url = fields.Str(dump_only=True)


class CreateDocumentRequestSchema(Schema):
    source = fields.Str(required=True)
    type = fields.Enum(DocumentType, required=True)


class DocumentImportStatusResponseSchema(Schema):
    id = fields.Str(dump_only=True)
    document_id = fields.Str()
    status = fields.Enum(DocumentStatus)
    progress = fields.Int()
    total_steps = fields.Int()
    created_at = fields.DateTime()


class DocumentResponseSchema(Schema):
    id = fields.Str(dump_only=True)
    type = fields.Enum(DocumentType)
    name = fields.Str()
    description = fields.Str()
    created_at = fields.DateTime()
    document_import_status = fields.Nested(DocumentImportStatusResponseSchema(), dump_only=True, allow_none=True)
    # updated_at = fields.DateTime()


class DocumentPaginationResponseSchema(Schema):
    pagination = fields.Nested(PaginationSchema())
    items = fields.List(fields.Nested(DocumentResponseSchema()))
