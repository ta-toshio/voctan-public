import os
import re

import requests

from instance.youtube import youtube


def get_transcript_from_youtube(url: str):
    video_id = get_youtube_video_id(url)
    title = get_title(video_id)

    params = {
        "api_key": os.getenv("SEARCHAPI_KEY"),
        "engine": "youtube_transcripts",
        "video_id": video_id,
        "lang": "en",
    }

    response = requests.get("https://www.searchapi.io/api/v1/search", params=params)
    result = response.json()

    if not "transcripts" in result:
        return title, None

    texts = []
    for transcript in result["transcripts"]:
        texts.append(transcript["text"])

    return title, " ".join(texts)


def get_title(video_id: str):
    # Request video details
    response = youtube.videos().list(
        part='snippet',
        id=video_id
    ).execute()

    if 'items' in response and response['items']:
        return response['items'][0]['snippet']['title']
    else:
        return None


def get_youtube_video_id(url: str) -> str:
    # Regular expression to match YouTube video IDs
    pattern = r'(?:v=|\/)([0-9A-Za-z_-]{10,12}).*'
    match = re.search(pattern, url)
    if match:
        return match.group(1)
    else:
        raise ValueError("Invalid YouTube URL")
