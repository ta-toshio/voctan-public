import os

import resend

resend.api_key = os.getenv("RESEND_API_KEY")


def send_verification_email(to: str, url: str):
    params: resend.Emails.SendParams = {
        "from": "no-reply@voctan.com",
        "to": [to],
        "subject": "本登録のお願い",
        "html": f"""
        <p>Voctanへご登録いただきありがとうございます。</p>
        <p>以下のリンクをクリックして本登録をお願いいたします。</p>
        
        <p>本登録URL</p>
        <p><a href="{url}">{url}</a></p>
        """,
    }
    return resend.Emails.send(params)
