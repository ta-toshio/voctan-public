import os
import json
import boto3

from wtpsplit import SaT

sat = SaT("sat-3l-sm")

# bucket_name = 'v-word-dev'
bucket_name = os.environ['BUCKET_NAME']


def lambda_handler(event, context):
    type = event.get('type')

    if type == 'VIDEO' or type == 'WEB':
        return process_on_youtube_or_web(event, context)
    elif type == 'BOOK':
        return process_on_book(event, context)
    else:
        raise Exception("Invalid type")


def process_on_youtube_or_web(event, context):
    type = event.get('type')
    document_id = event.get('document_id')

    text = get_s3(bucket_name, f"document/{document_id}/body.txt")

    sentences = [] if not text else sat.split(text)

    save_s3(
        json.dumps(sentences),
        bucket_name,
        f"document/{document_id}/sentences.json"
    )

    return {
        "type": type,
        "document_id": document_id,
        # "sentences": sentences
    }


def process_on_book(event, context):
    type = event.get('type')
    document_id = event.get('document_id')
    chapter_id = event.get('chapter_id')
    chapter_index = int(event.get('chapter_index'))
    chapter_count = int(event.get('chapter_count'))
    has_chapter = bool(event.get('has_chapter'))
    target_chapter_index = chapter_index
    multiple_save = False

    this_chapter_text = get_s3(bucket_name, f"document/{document_id}/{chapter_index}/body.txt")
    this_chapter_sentences = [] if not this_chapter_text else sat.split(this_chapter_text)

    if has_chapter and chapter_index > 0:
        previous_chapter_index = chapter_index - 1
        previous_chapter_text = get_s3(bucket_name, f"document/{document_id}/{previous_chapter_index}/body.txt")
        previous_chapter_sentences = [] if not previous_chapter_text else sat.split(previous_chapter_text)

        if 3 < len(this_chapter_sentences):
            duplicated_index = list_index_of(this_chapter_sentences[:3], previous_chapter_text)
            if duplicated_index is not None:
                previous_chapter_sentences = previous_chapter_sentences[:duplicated_index]

        save_s3(
            json.dumps(previous_chapter_sentences),
            bucket_name,
            f"document/{document_id}/{previous_chapter_index}/sentences.json"
        )

        target_chapter_index = previous_chapter_index

        if chapter_index == (chapter_count - 1):
            save_s3(
                json.dumps(this_chapter_sentences),
                bucket_name,
                f"document/{document_id}/{chapter_index}/sentences.json"
            )
            multiple_save = True

    else:
        save_s3(
            json.dumps(this_chapter_sentences),
            bucket_name,
            f"document/{document_id}/{chapter_index}/sentences.json"
        )

    return {
        "type": type,
        "document_id": document_id,
        "chapter_id": chapter_id,
        "chapter_index": chapter_index,
        "chapter_count": chapter_count,
        "has_chapter": has_chapter,
        "target_chapter_index": target_chapter_index,
        "multiple_save": multiple_save,
    }


def save_s3(body, bucket_name, file_key):
    s3 = boto3.client('s3')
    s3.put_object(Bucket=bucket_name, Key=file_key, Body=body)


def get_s3(bucket_name, file_key, to_json=False):
    s3 = boto3.client('s3')
    response = s3.get_object(
        Bucket=bucket_name,
        Key=file_key,
    )
    content = response['Body'].read().decode('utf-8')
    if to_json:
        return json.loads(content)
    return content


def list_index_of(needle, haystack):
    # haystack内にneedleが存在するかをチェック
    for i in range(len(haystack) - len(needle) + 1):
        if haystack[i:i + len(needle)] == needle:
            return i
    return None
