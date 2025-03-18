import os

from googleapiclient.discovery import build

youtube = build('youtube', 'v3', developerKey=os.getenv("GOOGLE_API_KEY"))
