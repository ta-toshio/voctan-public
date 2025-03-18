import os

from flask import request
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from db import db
from models import DocumentModel, DocumentImportStatusModel
from models.document import DocumentType
from schemas import PreSignedUrlSchema, DocumentPaginationResponseSchema, CreateDocumentRequestSchema, \
    DocumentResponseSchema
from domains import document
from usecases.import_word_from_pdf import import_word_from_pdf
from usecases.import_word_from_web import import_word_from_web
from usecases.import_word_from_youtube import import_word_from_youtube

blp = Blueprint("Documents", __name__, description="Operations on documents")


@blp.route("/documents/put_signed_url")
class DocumentSignedUrl(MethodView):
    @blp.response(200, PreSignedUrlSchema)
    def get(self):
        return {
            "url": document.issue_upload_presigned_url()
        }


@blp.route("/documents/<string:document_id>")
class Document(MethodView):

    @jwt_required()
    @blp.response(200, DocumentResponseSchema)
    def get(self, document_id):
        return db.get_or_404(DocumentModel, document_id)

    @jwt_required()
    @blp.response(204)
    def delete(self, document_id):
        jwt = get_jwt_identity()
        user_id_from_jwt = jwt.get("id")
        print("-user_id_from_jwt")
        print(user_id_from_jwt)

        document_entity = db.get_or_404(DocumentModel, document_id)
        print("document_entity.user_id")
        print(document_entity.user_id)
        if str(document_entity.user_id) != user_id_from_jwt:
            abort(403, message="Forbidden")

        # db.session.delete(document_entity)
        # 上だと null value in column "document_id" of relation "document_import_status" violates not-null constraint
        # というエラーが出るので、こちらで削除する
        db.session.execute(
            text("DELETE FROM document WHERE id = :document_id").params(document_id=document_id)
        )
        db.session.commit()
        return None, 204


@blp.route("/documents")
class DocumentList(MethodView):

    @jwt_required()
    @blp.response(200, DocumentPaginationResponseSchema)
    def get(self):
        jwt = get_jwt_identity()
        user_id = jwt.get("id")

        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 50, type=int)

        documents = DocumentModel.query.filter_by(
            user_id=user_id
        ).outerjoin(
            DocumentImportStatusModel,
            DocumentModel.id == DocumentImportStatusModel.document_id
        ).order_by(
            DocumentModel.id.desc()
        ).paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )

        return {
            "pagination": {
                "total": documents.total,
                "pages": documents.pages,
                "current_page": documents.page,
                "next_page": documents.next_num,
                "prev_page": documents.prev_num
            },
            "items": documents.items
        }

    @jwt_required()
    @blp.arguments(CreateDocumentRequestSchema)
    @blp.response(200, DocumentResponseSchema)
    def post(self, create_document_data):
        jwt = get_jwt_identity()
        user_id = jwt.get("id")

        document_type = create_document_data.get("type")
        source = create_document_data.get("source")

        try:
            if document_type == DocumentType.BOOK:
                name = os.path.basename(source)
                return import_word_from_pdf(user_id, name, source)
            elif document_type == DocumentType.VIDEO:
                return import_word_from_youtube(source, user_id)
            elif document_type == DocumentType.WEB:
                return import_word_from_web(source, user_id)

            abort(400)
        except SQLAlchemyError:
            abort(500)
