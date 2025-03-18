# from domains.document_word import sentences_to_document_words
# from utils.sentence_splitter import sentence_splitter
from db import db
from models import DocumentModel
from models.document import DocumentType
from domains.document import document_import_status_factory
from utils.aws import create_text_word_extractor_step_functions
from utils.get_body_from_web import get_body_from_web


def import_word_from_web(url: str, user_id: str):
    title, body = get_body_from_web(url)

    document_entity = DocumentModel(
        user_id=user_id,
        type=DocumentType.WEB,
        name=title,
    )
    db.session.add(document_entity)
    db.session.flush()

    document_import_status_model = document_import_status_factory(document_entity.id, progress=1)
    db.session.add(document_import_status_model)
    db.session.commit()

    create_text_word_extractor_step_functions(body, str(document_entity.id), DocumentType.WEB)

    return document_entity
