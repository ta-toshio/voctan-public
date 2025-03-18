from marshmallow import Schema, fields

class PaginationSchema(Schema):
    total = fields.Int()
    pages = fields.Int()
    current_page = fields.Int()
    next_page = fields.Int(allow_none=True)
    prev_page = fields.Int(allow_none=True)


class PaginationArgsSchema(Schema):
    page = fields.Int(missing=1)
    per_page = fields.Int(missing=50)
