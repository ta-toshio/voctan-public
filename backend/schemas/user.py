from marshmallow import Schema, fields


class UserResponseSchema(Schema):
    id = fields.Str(dump_only=True)
    email = fields.Str()
    name = fields.Str()


class EmailVerificationResponse(Schema):
    id = fields.Str(dump_only=True)
    email = fields.Str()
    name = fields.Str()
    token = fields.Str()
    expired_at = fields.DateTime()


class UserRegisterRequestSchema(Schema):
    email = fields.Str()
    name = fields.Str()
    password = fields.Str()


class UserRegisterResponseSchema(Schema):
    id = fields.Str(dump_only=True)
    email = fields.Str()
    name = fields.Str()
    token = fields.Str()


class VerifyTokenRequestSchema(Schema):
    token = fields.Str()


class VerifyTokenResponseSchema(Schema):
    id = fields.Str(dump_only=True)


class UserSignInRequestSchema(Schema):
    email = fields.Str(required=True)
    password = fields.Str(required=True)


class UserSignInResponseSchema(Schema):
    id = fields.Str(dump_only=True)
    email = fields.Str()
    name = fields.Str()


class UserSignInWithGoogleRequestSchema(Schema):
    email = fields.Str(required=True)
    name = fields.Str()
    id_token = fields.Str(required=True)


class UserByEmailRequestSchema(Schema):
    email = fields.Str(required=True)
    id_token = fields.Str(required=True)


class UserSignInWithGoogleResponseSchema(Schema):
    created = fields.Bool()
    user = fields.Nested(UserResponseSchema())
