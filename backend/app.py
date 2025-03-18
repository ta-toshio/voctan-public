import os

from dotenv import load_dotenv

from flask import Flask
from flask_smorest import Api
from flask_jwt_extended import JWTManager

from db import db
from flask_migrate import Migrate
from flask_cors import CORS

from celeny_init import celery_init_app


def create_app() -> Flask:
    app = Flask(__name__)
    load_dotenv()

    import models
    from resources import (
        user_blueprint,
        document_blueprint,
        document_word_blueprint,
        chapter_blueprint,
        webhook_blueprint,
    )
    from command_register import command_register

    app.config["PROPAGATE_EXCEPTIONS"] = True
    app.config["API_TITLE"] = "voctan"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"

    if os.getenv("APP_ENV") == "develop":
        app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
        app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

    db_url = os.getenv("DATABASE_URL")
    if db_url is None:
        raise ValueError("DATABASE_URL is not set")

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")

    # if os.getenv("APP_ENV") == "develop":
    #     app.config['SQLALCHEMY_ECHO'] = True

    db.init_app(app)
    migrate = Migrate(app, db)

    CORS(app, resources={r"/*": {"origins": "*"}})
    api = Api(app)

    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
    jwt = JWTManager(app)

    app.config.from_mapping(
        CELERY=dict(
            broker_url=os.getenv("CELERY_BROKER_URL"),
            result_backend=os.getenv("CELERY_RESULT_URL"),
            imports=[
                "tasks",
                "tasks.sample",
                "tasks.import_document_word",
                "tasks.extract_word_register",
                "tasks.duplication_resolver",
            ],
            task_ignore_result=True,
            # broker_transport_options={
            #     "region": "ap-northeast-1",
            #     "visibility_timeout": 60 * 30, # 30 minutes
            #     "polling_interval": 5,
            #     'queue_name_prefix': f"{os.getenv("APP_ENV", "develop")}-",
            #     'wait_time_seconds': 20,
            # },
            # # task_default_queue=os.getenv("SQS_QUEUE_NAME"),
        ),
    )
    app.config.from_prefixed_env()
    celery_init_app(app)

    command_register(app)

    blueprint = [
        user_blueprint,
        document_blueprint,
        document_word_blueprint,
        chapter_blueprint,
        webhook_blueprint,
    ]
    for bp in blueprint:
        api.register_blueprint(bp)


    @app.get("/health_check")
    def health_check():
        return {"ping": "pong"}

    return app
