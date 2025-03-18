import os

from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError


def send_message(message):
    # 取得したSlackのBotトークン
    slack_token = os.getenv("SLACK_BOT_TOKEN")
    client = WebClient(token=slack_token)

    try:
        client.chat_postMessage(
            channel="#voctan",
            text=message
        )
    except SlackApiError as e:
        print(f"Error sending message: {e.response['error']}")
