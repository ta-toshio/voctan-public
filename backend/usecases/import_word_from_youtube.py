from urllib.parse import urlparse, parse_qs, urlencode, urlunparse
# from domains.document_word import sentences_to_document_words
# from utils.sentence_splitter import sentence_splitter
from db import db
from models import DocumentModel
from models.document import DocumentType
from domains.document import document_import_status_factory
from utils.aws import create_text_word_extractor_step_functions
from utils.get_transcript_from_youtube import get_transcript_from_youtube


def import_word_from_youtube(url: str, user_id: str):
    title, transcript = get_transcript_from_youtube(url)
    if not transcript:
        raise Exception("No transcript found")

    document_entity = DocumentModel(
        user_id=user_id,
        type=DocumentType.VIDEO,
        name=title or clean_youtube_url(url),
    )
    db.session.add(document_entity)
    db.session.flush()

    document_import_status_model = document_import_status_factory(document_entity.id, progress=1)
    db.session.add(document_import_status_model)
    db.session.commit()

    create_text_word_extractor_step_functions(transcript, str(document_entity.id), DocumentType.VIDEO)

    return document_entity


def clean_youtube_url(url: str) -> str:
    parsed_url = urlparse(url)
    query_params = parse_qs(parsed_url.query)
    v_param = query_params.get('v')

    if not v_param:
        raise ValueError("The URL does not contain a 'v' parameter")

    new_query = urlencode({'v': v_param[0]})
    cleaned_url = urlunparse(parsed_url._replace(query=new_query))

    return str(cleaned_url)
