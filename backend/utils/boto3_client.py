import os

import boto3


def boto3_factory(service_name: str, region_name: str = ''):
    params = {
        'aws_access_key_id': os.getenv('AWS_ACCESS_KEY_ID'),
        'aws_secret_access_key': os.getenv('AWS_SECRET_KEY'),
        'region_name': region_name or os.getenv('AWS_REGION'),
    }

    return boto3.client(service_name, **params)


def dynamodb_factory():
    params = {
        'aws_access_key_id': os.getenv('AWS_ACCESS_KEY_ID'),
        'aws_secret_access_key': os.getenv('AWS_SECRET_KEY'),
        'region_name': os.getenv('AWS_REGION'),
    }
    return boto3.client("dynamodb", **params)
