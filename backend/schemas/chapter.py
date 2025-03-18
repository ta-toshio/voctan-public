from marshmallow import Schema, fields


class ChapterResponseSchema(Schema):
    id = fields.Str(dump_only=True)
    document_id = fields.Str()
    index = fields.Int()
    name = fields.Str()
    title = fields.Str()
