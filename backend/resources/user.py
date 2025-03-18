import os
from datetime import timedelta

from google.oauth2 import id_token
from google.auth.transport import requests

from passlib.hash import pbkdf2_sha256

from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from sqlalchemy.exc import SQLAlchemyError

from db import db
from models import EmailVerificationModel, UserModel, UserCredentialModel
from schemas import (
    UserRegisterRequestSchema,
    UserRegisterResponseSchema,
    VerifyTokenRequestSchema,
    VerifyTokenResponseSchema,
    UserSignInRequestSchema,
    UserSignInResponseSchema,
    UserResponseSchema,
    UserSignInWithGoogleRequestSchema,
    UserSignInWithGoogleResponseSchema,
    UserByEmailRequestSchema
)
from utils.jwt import verify_token
from utils.resend import send_verification_email
from utils.slack import send_message

blp = Blueprint("Users", __name__, description="Operations on users")


@blp.route("/users/<string:user_id>")
class User(MethodView):

    @jwt_required()
    @blp.response(200, UserResponseSchema)
    def get(self, user_id):
        return db.get_or_404(UserModel, user_id)

    @jwt_required()
    @blp.response(204)
    def delete(self, user_id):
        jwt = get_jwt_identity()
        user_id_from_jwt = jwt.get("id")
        if user_id != user_id_from_jwt:
            abort(403, message="Forbidden")

        user = db.get_or_404(UserModel, user_id)
        db.session.delete(user)
        db.session.commit()
        return None, 204


@blp.route("/user/register")
class UserRegister(MethodView):

    @blp.arguments(UserRegisterRequestSchema)
    @blp.response(201, UserRegisterResponseSchema)
    def post(self, registration_data):

        hashed_password = pbkdf2_sha256.hash(registration_data["password"])

        token = create_access_token(
            identity=registration_data["email"],
            expires_delta=timedelta(hours=1),
        )

        try:
            db.session.query(
                EmailVerificationModel
            ).filter_by(
                email=registration_data["email"]
            ).delete()

            email_verification = EmailVerificationModel(
                email=registration_data["email"],
                name=registration_data["name"],
                password=hashed_password,
                token=str(token),
            )
            db.session.add(email_verification)

            # @TODO replace to real email
            send_verification_email(
                registration_data["email"],
                f"{os.getenv("APP_URL")}/verify-email?token={token}"
            )

            db.session.commit()

            return email_verification
        except SQLAlchemyError as e:
            abort(500, message=str(e))


@blp.route("/user/verification")
class UserVerification(MethodView):

    @blp.arguments(VerifyTokenRequestSchema)
    @blp.response(201, VerifyTokenResponseSchema)
    def post(self, token_data):
        token = verify_token(token_data["token"])
        if not token:
            abort(401, message="Invalid token")

        email_verification = db.one_or_404(
            db.select(
                EmailVerificationModel
            ).filter_by(
                token=token_data["token"]
            ),
            description=f"Token not found"
        )

        user = db.session.execute(
            db.select(
                UserModel
            ).filter_by(
                email=email_verification.email
            )
        ).first()

        if user:
            abort(409, message="User already registered")

        try:
            user = UserModel(
                email=email_verification.email,
                name=email_verification.name,
            )

            db.session.add(user)
            db.session.flush()

            user_credential = UserCredentialModel(
                user_id=user.id,
                password=email_verification.password,
            )

            db.session.add(user_credential)
            # db.session.delete(email_verification)

            db.session.commit()

            send_message(f"New user registered: {user.name}")

            return user

        except SQLAlchemyError:
            abort(500)


@blp.route("/user/sign-in")
class UserSignIn(MethodView):

    @blp.arguments(UserSignInRequestSchema)
    @blp.response(201, UserSignInResponseSchema)
    def post(self, request_data):
        user = db.one_or_404(
            db.select(
                UserModel
            ).filter_by(
                email=request_data["email"]
            ),
        )
        user_credential = db.one_or_404(
            db.select(
                UserCredentialModel
            ).filter_by(
                user_id=user.id
            ),
        )

        if not pbkdf2_sha256.verify(request_data["password"], user_credential.password):
            abort(401, message="Invalid credentials")

        return user


@blp.route("/user/sign-in-with-google")
class UserSignInWithGoogle(MethodView):

    @blp.arguments(UserSignInWithGoogleRequestSchema)
    @blp.response(201, UserSignInWithGoogleResponseSchema)
    def post(self, request_data):

        try:
            # tokenを検証。audienceパラメータでクライアントIDを渡す
            id_info = id_token.verify_oauth2_token(
                request_data["id_token"],
                requests.Request(),
                os.getenv("GOOGLE_CLIENT_ID"),
                clock_skew_in_seconds=300
            )

            user = db.session.execute(
                db.select(
                    UserModel
                ).filter_by(
                    email=id_info['email']
                )
            ).first()
            if user:
                return {
                    "created": False,
                    "user": user,
                }

            user = UserModel(
                email=id_info['email'],
                name=request_data.get("name", id_info['name']),
            )

            db.session.add(user)
            db.session.commit()

            send_message(f"New user registered: {user.name}")

            return {
                "created": True,
                "user": user,
            }
        except ValueError as e:
            abort(401, message=str(e))


@blp.route("/user/by-email-with-google-token")
class UserByEmail(MethodView):

    @blp.arguments(UserByEmailRequestSchema, location="query")
    @blp.response(200, UserResponseSchema)
    def get(self, request_data):
        try:
            id_token.verify_oauth2_token(
                request_data["id_token"],
                requests.Request(),
                os.getenv("GOOGLE_CLIENT_ID"),
                clock_skew_in_seconds=300
            )
        except ValueError as e:
            abort(401, message=str(e))

        return db.one_or_404(
            db.select(
                UserModel
            ).filter_by(
                email=request_data["email"]
            ),
        )
