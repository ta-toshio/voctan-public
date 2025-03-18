from flask.views import MethodView
from flask_smorest import Blueprint

from domains.document import create_document_import_error
from models.document import DocumentType
from schemas.webhook import (
    WebhookDocumentWordArgsSchema,
    WebhookDocumentWordResponseSchema,
    WebhookDocumentWordErrorArgsSchema,
    WebhookDocumentWordErrorResponseSchema
)
from tasks.import_document_word import import_document_word

blp = Blueprint("Webhook", __name__, description="Operations on webhook")


@blp.route("/webhook/document-word")
class WebhookDocumentWord(MethodView):

    @blp.arguments(WebhookDocumentWordArgsSchema)
    @blp.response(200, WebhookDocumentWordResponseSchema)
    def post(self, request_data):
        print("------DocumentWordWebhook post")
        print(request_data)

        document_id = request_data["document_id"]
        document_type = DocumentType.to_enum(request_data["type"])

        if document_type == DocumentType.BOOK:

            import_document_word.delay(
                document_type=document_type,
                document_id=document_id,
                chapter_index=request_data["target_chapter_index"],
                chapter_count=request_data["chapter_count"],
                has_chapter=request_data["has_chapter"],
            )

            if request_data["multiple_save"]:
                import_document_word.delay(
                    document_type=document_type,
                    document_id=document_id,
                    chapter_index=request_data["chapter_index"],
                    chapter_count=request_data["chapter_count"],
                    has_chapter=request_data["has_chapter"]
                )

        elif document_type in (DocumentType.WEB, DocumentType.VIDEO):

            import_document_word.delay(
                document_type=document_type,
                document_id=document_id,
                chapter_index=None,
                chapter_count=None,
                has_chapter=False,
            )

        return {
            "document_id": document_id
        }


@blp.route("/webhook/document-word/error")
class WebhookDocumentWordError(MethodView):

    @blp.arguments(WebhookDocumentWordErrorArgsSchema)
    @blp.response(200, WebhookDocumentWordErrorResponseSchema)
    def post(self, request_data):
        print("------DocumentWordWebhookError post")

        document_id = request_data["document_id"]
        create_document_import_error(request_data["document_id"], "StepFunctions Error occurred")

        return {
            "document_id": document_id
        }
