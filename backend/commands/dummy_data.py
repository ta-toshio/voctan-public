from db import db
from domains.document import document_factory, document_import_status_factory
from domains.user import user_factory
from models import DocumentImportErrorModel
from models.document import DocumentType
from models.document_import_status import DocumentStatus


def create_user():
    for i in range(10):
        email = f"a{i}@.com"
        name = f"UserName {i}"
        user_model = user_factory(email, name)
        db.session.add(user_model)

    db.session.commit()


def create_document(user_id: str):
    for i in range(10):
        name = f"Document {i}"
        description = f"Description {i}"
        document_model = document_factory(user_id, DocumentType.BOOK, name, description)
        db.session.add(document_model)
        db.session.flush()

        document_import_status_model = document_import_status_factory(
            document_model.id,
            f"documents/{document_model.id}",
            DocumentStatus.PENDING,
        )
        db.session.add(document_import_status_model)

    db.session.commit()


def create_error():
    document_import_error = DocumentImportErrorModel(
        document_id="0191da43-b35e-78d9-b52f-a40f7792542a",
        message="aa",
        chapter_id="0191e5fe-f233-748d-9d61-3745ee30834c",
    )
    db.session.add(document_import_error)
    db.session.commit()
