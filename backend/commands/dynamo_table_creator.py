import os

from utils.boto3_client import boto3_factory


def dynamo_table_creator():
    dynamodb = boto3_factory('dynamodb', os.getenv('AWS_REGION'))

    existing_tables = dynamodb.list_tables()['TableNames']
    if 'document_words' in existing_tables:
        print("Table already exists. Skipping creation.")
        return

    table = dynamodb.create_table(
        TableName='document_words',
        KeySchema=[
            {
                'AttributeName': 'id',
                'KeyType': 'HASH'  # Partition key
            },
        ],
        AttributeDefinitions=[
            {
                'AttributeName': 'id',
                'AttributeType': 'S'
            },
            {
                'AttributeName': 'documentId',
                'AttributeType': 'S'
            },
            {
                'AttributeName': 'wordId',
                'AttributeType': 'S'
            },
            {
                'AttributeName': 'idx',
                'AttributeType': 'N'
            },
            # {
            #     'AttributeName': 'chapter',
            #     'AttributeType': 'N'
            # },
            # {
            #     'AttributeName': 'duplication',
            #     'AttributeType': 'BOOL'
            # },
            # {
            #     'AttributeName': 'example',
            #     'AttributeType': 'SS'
            # },
            # {
            #     'AttributeName': 'level',
            #     'AttributeType': 'N'
            # },
        ],
        GlobalSecondaryIndexes=[
            {
                'IndexName': 'DocumentIdxIndex',
                'KeySchema': [
                    {
                        'AttributeName': 'documentId',
                        'KeyType': 'HASH'
                    },
                    {
                        'AttributeName': 'idx',
                        'KeyType': 'RANGE'
                    }
                ],
                'Projection': {
                    'ProjectionType': 'ALL'
                },
                'ProvisionedThroughput': {
                    'ReadCapacityUnits': 1,
                    'WriteCapacityUnits': 1
                }
            },
            {
                'IndexName': 'DocumentWordIndex',
                'KeySchema': [
                    {
                        'AttributeName': 'documentId',
                        'KeyType': 'HASH'
                    },
                    {
                        'AttributeName': 'wordId',
                        'KeyType': 'RANGE'
                    }
                ],
                'Projection': {
                    'ProjectionType': 'ALL'
                },
                'ProvisionedThroughput': {
                    'ReadCapacityUnits': 1,
                    'WriteCapacityUnits': 1
                }
            },
            # {
            #     'IndexName': 'DocumentChapterIndex',
            #     'KeySchema': [
            #         {
            #             'AttributeName': 'documentId',
            #             'KeyType': 'HASH'
            #         },
            #         {
            #             'AttributeName': 'chapter',
            #             'KeyType': 'RANGE'
            #         }
            #     ],
            #     'Projection': {
            #         'ProjectionType': 'ALL'
            #     },
            #     'ProvisionedThroughput': {
            #         'ReadCapacityUnits': 1,
            #         'WriteCapacityUnits': 1
            #     }
            # },
        ],
        ProvisionedThroughput={
            'ReadCapacityUnits': 1,
            'WriteCapacityUnits': 1
        }
    )

    # table.meta.client.get_waiter('table_exists').wait(TableName='document_words')
    print("Table created successfully.")
