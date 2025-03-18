import json
import os

from models.document import DocumentType
from utils.boto3_client import boto3_factory


def create_text_word_extractor_step_functions(text: str, document_id: str, document_type: DocumentType):
    s3_client = boto3_factory('s3')
    sf_client = boto3_factory('stepfunctions')

    s3_client.put_object(
        Bucket=os.getenv('WORD_BUCKET_NAME'),
        Key=f"document/{document_id}/body.txt",
        Body=text
    )

    input_param = {
        "type": document_type.value,
        "document_id": document_id,
    }
    sf_client.start_execution(
        stateMachineArn=os.getenv('STATE_MACHINE_ARN'),
        input=json.dumps(input_param)
    )


def create_book_word_extractor_step_functions(
        text: str,
        document_id: str,
        chapter_id: str,
        chapter_index: int,
        chapter_count: int,
        has_chapter: bool
):
    sf_client = boto3_factory('stepfunctions')

    input_param = {
        "type": DocumentType.BOOK.value,
        "text": text,
        "document_id": document_id,
        "chapter_id": chapter_id,
        "chapter_index": chapter_index,
        "chapter_count": chapter_count,
        "has_chapter": has_chapter,
    }
    sf_client.start_execution(
        stateMachineArn=os.getenv('STATE_MACHINE_ARN'),
        input=json.dumps(input_param)
    )
