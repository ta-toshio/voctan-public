from datetime import timedelta

from flask_jwt_extended import create_access_token, decode_token

from domains.const import UserType


def gen_user_access_token(user_id: str):
    return create_access_token(
        identity={"id": user_id, "user_type": UserType.USER.value},
        fresh=True,
        expires_delta=timedelta(hours=1)
   )


def verify_token(token):
    try:
        decoded_token = decode_token(token)
        return decoded_token
    except Exception as e:
        return None
