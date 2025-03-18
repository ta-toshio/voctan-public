from marshmallow import Schema, fields

from schemas.pagination import PaginationSchema, PaginationArgsSchema


class WordResponseSchema(Schema):
    id = fields.Str(dump_only=True)
    word = fields.Str()
    mean = fields.Str()
    level = fields.Int()
    grade = fields.Int()


class DocumentWordResponseSchema(Schema):
    id = fields.Str(dump_only=True)
    document_id = fields.Str()
    word_id = fields.Str()
    index = fields.Int()
    chapter_id = fields.Str()
    example = fields.Str()
    duplication = fields.Boolean()
    word_raw = fields.Str()
    word = fields.Nested(WordResponseSchema(), dump_only=True)


class DocumentWordPaginationResponseSchema(Schema):
    pagination = fields.Nested(PaginationSchema())
    items = fields.List(fields.Nested(DocumentWordResponseSchema()))


class DocumentWordQueryArgsSchema(PaginationArgsSchema):
    search = fields.Str()
