from db import db
from domains.document import document_factory, document_import_status_factory
from models.document import DocumentType
from tasks.extract_word_register import extract_word_register


def import_word_from_pdf(user_id: str, name: str, file_path: str):
    document_entity = document_factory(user_id, DocumentType.BOOK, name)

    db.session.add(document_entity)
    db.session.flush()

    document_import_status_model = document_import_status_factory(
        document_entity.id,
        file_path,
    )
    db.session.add(document_import_status_model)
    db.session.commit()

    extract_word_register.delay(str(document_entity.id))

    return document_entity
