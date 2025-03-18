from marshmallow import Schema, fields


class WebhookDocumentWordArgsSchema(Schema):
    type = fields.Str(required=True)
    document_id = fields.Str(required=True)
    chapter_id = fields.Str()
    chapter_index = fields.Int()
    chapter_count = fields.Int()
    has_chapter = fields.Bool()
    target_chapter_index = fields.Int()
    multiple_save = fields.Bool()


class WebhookDocumentWordResponseSchema(Schema):
    document_id = fields.Str(dump_only=True)


class WebhookDocumentWordErrorArgsSchema(Schema):
    document_id = fields.Str()


class WebhookDocumentWordErrorResponseSchema(Schema):
    document_id = fields.Str(dump_only=True)
