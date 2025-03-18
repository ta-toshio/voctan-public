from flask.views import MethodView
from flask_smorest import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import text

from db import db
from models import (
    WordModel, DocumentModel, DocumentWordModel, ChapterModel
)
from schemas import DocumentWordPaginationResponseSchema, DocumentWordQueryArgsSchema

blp = Blueprint("DocumentWords", __name__, description="Operations on document words")


@blp.route("/documents/<string:document_id>/words")
class DocumentWord(MethodView):
    @jwt_required()
    @blp.arguments(DocumentWordQueryArgsSchema, location="query")
    @blp.response(200, DocumentWordPaginationResponseSchema)
    def get(self, pagination_args, document_id):
        jwt = get_jwt_identity()
        user_id = jwt.get("id")

        # page = request.args.get('page', 1, type=int)
        # per_page = request.args.get('per_page', 50, type=int)

        page = pagination_args['page']
        per_page = pagination_args['per_page']

        document = db.one_or_404(
            db.select(DocumentModel).filter_by(
                id=document_id,
                user_id=user_id
            )
        )

        query = db.select(
            DocumentWordModel,
            WordModel,
            # WordModel.word.label("word"),
        ).outerjoin(
            WordModel,
            DocumentWordModel.word_id == WordModel.id
        ).outerjoin(
            ChapterModel,
            DocumentWordModel.chapter_id == ChapterModel.id
        ).filter(
            DocumentWordModel.document_id == document.id,
            DocumentWordModel.duplication == False
        ).order_by(
            ChapterModel.index.asc(),
            DocumentWordModel.id.desc(),
        )

        if "search" in pagination_args and pagination_args["search"].strip() != "":
            search_term = f"{pagination_args['search'].strip()}%"
            query = query.filter(
                WordModel.word.like(text(':search_term')).params(search_term=search_term)
            )

        words = db.paginate(
            select=query,
            page=page,
            per_page=per_page,
        )

        return {
            "pagination": {
                "total": words.total,
                "pages": words.pages,
                "current_page": words.page,
                "next_page": words.next_num,
                "prev_page": words.prev_num
            },
            "items": words.items
        }
