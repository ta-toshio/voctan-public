import click
from flask import Flask


def command_register(app: Flask):
    @app.cli.command("import_word")
    def import_word():
        from commands.import_ejdict import import_word
        import_word(app)

    @app.cli.command("test_worker")
    def test_worker():
        from tasks.sample import add_together
        print("Test Worker")
        add_together.delay(1, 2)
        # get_db_data.delay("0191c620-86bc-71f4-a9fd-868b55ba7f9f")

    @app.cli.command("upload_s3")
    @click.argument("file_path")
    def upload_s3(file_path: str):
        from commands.s3_simple_client import s3_uploader
        s3_uploader(file_path)

    @app.cli.command("download_s3")
    @click.argument("src", nargs=1)
    @click.argument("out", nargs=1)
    def download_s3(src: str, out: str):
        from commands.s3_simple_client import s3_downloader
        s3_downloader(src, out)

    @app.cli.command("issue_upload_presigned_url")
    @click.argument("file_path", nargs=1)
    def issue_upload_presigned_url(file_path: str):
        from commands.s3_simple_client import issue_upload_presigned_url
        issue_upload_presigned_url(file_path)

    @app.cli.command("upload_with_presigned_url")
    @click.argument("file_path", nargs=1)
    @click.argument("signed_url", nargs=1)
    def upload_with_presigned_url(file_path: str, signed_url: str):
        from commands.s3_simple_client import upload_with_presigned_url
        upload_with_presigned_url(file_path, signed_url)

    @app.cli.command("gen_jwt")
    @click.argument("user_type", nargs=1)
    @click.argument("user_id", nargs=1)
    def gen_jwt(user_type: str, user_id: str):
        from utils.jwt import gen_user_access_token
        if user_type == "user":
            print(gen_user_access_token(user_id))
        else:
            print("Invalid type")

    @app.cli.command("create_dynamo_table")
    def create_dynamo_table():
        from commands.dynamo_table_creator import dynamo_table_creator
        dynamo_table_creator()

    @app.cli.command("create_document_words")
    def create_document_words():
        from commands.dynamo_query_test import create_document_words
        create_document_words()

    @app.cli.command("create_user")
    def create_user():
        from commands.dummy_data import create_user
        create_user()

    @app.cli.command("create_document")
    @click.argument("user_id", nargs=1)
    def create_document(user_id: str):
        from commands.dummy_data import create_document
        create_document(user_id)

    @app.cli.command("read_task_data")
    @click.argument("task_id", nargs=1)
    def read_task_data(task_id: str):
        from commands.read_task import read_task
        print(read_task(task_id))

    @app.cli.command("import_document_word")
    @click.argument("document_id", nargs=1)
    def import_document_word(document_id: str):
        from tasks.extract_word_register import extract_word_register
        extract_word_register(document_id)

    @app.cli.command("extract_web_content")
    @click.argument("url", nargs=1)
    def extract_web_content(url: str):
        from utils.get_body_from_web import get_body_from_web
        title, body = get_body_from_web(url)
        print(title)
        print(body)

    @app.cli.command("import_word_from_web")
    @click.argument("url", nargs=1)
    @click.argument("user_id", nargs=1)
    def import_word_from_web(url: str, user_id: str):
        from usecases.import_word_from_web import import_word_from_web as _import_word_from_web
        _import_word_from_web(url, user_id)

    @app.cli.command("import_word_from_youtube")
    @click.argument("url", nargs=1)
    @click.argument("user_id", nargs=1)
    def import_word_from_youtube(url: str, user_id: str):
        from usecases.import_word_from_youtube import import_word_from_youtube as _import_word_from_youtube
        _import_word_from_youtube(url, user_id)

    @app.cli.command("create_state_machine_event")
    def create_state_machine_event():
        from commands.s3_simple_client import create_state_machine
        create_state_machine()

    @app.cli.command("import_document_word")
    @click.argument("document_id", nargs=1)
    @click.argument("chapter_index", nargs=1)
    @click.argument("chapter_count", nargs=1)
    @click.argument("has_chapter", nargs=1)
    def import_document_word(document_id: str, chapter_index: int, chapter_count: int, has_chapter: bool):
        from tasks.import_document_word import import_document_word
        import_document_word(document_id, chapter_index, chapter_count, has_chapter)

    @app.cli.command("duplication_resolver")
    @click.argument("document_id", nargs=1)
    def duplication_resolver(document_id: str):
        from tasks.duplication_resolver import duplication_resolver as dr
        dr(document_id)

    @app.cli.command("dummy_request_for_word_webhook")
    @click.argument("document_id", nargs=1)
    def dummy_request_for_word_webhook(document_id: str):
        from commands.dummy_request import dummy_request_for_word_webhook as rd
        rd(document_id)

    @app.cli.command("create_error")
    def create_error():
        from commands.dummy_data import create_error as ce
        ce()

    @app.cli.command("youtube")
    @click.argument("video_id", nargs=1)
    def youtube(video_id: str):
        from utils.get_transcript_from_youtube import get_transcript_from_youtube
        title, body = get_transcript_from_youtube(video_id)
        print(title)
        print(body)

    @app.cli.command("send_slack")
    def send_slack():
        from utils.slack import send_message
        send_message("Test Message")
