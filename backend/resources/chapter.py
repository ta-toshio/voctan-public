from flask.views import MethodView
from flask_smorest import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

from db import db
from models import ChapterModel
from schemas import ChapterResponseSchema

blp = Blueprint("Chapter", __name__, description="Operations on chapter")


@blp.route("/documents/<string:document_id>/chapters")
class Chapter(MethodView):
    # @jwt_required()
    @blp.response(200, ChapterResponseSchema(many=True))
    def get(self, document_id):
        chapters = db.session.execute(
            db.select(
                ChapterModel
            ).filter_by(
                document_id=document_id
            ).order_by(
                ChapterModel.index.asc()
            )
        ).scalars().all()

        return chapters
