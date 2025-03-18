import os

from utils.boto3_client import boto3_factory, dynamodb_factory


def create_document_words():
    dynamodb = dynamodb_factory()
    table_name = 'document_words'

    item = {
        'id': {'S': '1'},
        'document_id': {'S': 'doc1'},
        'word_id': {'S': 'word1'},
        'idx': {'N': '1'},
        'chapter': {'N': '1'},
        'example': {'SS': ['example1', 'example2']},
        'level': {'N': '1'}
    }

    dynamodb.put_item(TableName=table_name, Item=item)
    print("Item created successfully.")
