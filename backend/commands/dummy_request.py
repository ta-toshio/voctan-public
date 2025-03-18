import requests

from db import db
from models import ChapterModel, DocumentModel


def dummy_request_for_word_webhook(document_id: str):
    url = f"http://localhost:5000/webhook/document-word"

    headers = {
        "Content-Type": "application/json"
    }

    document = db.session.execute(
        db.select(
            DocumentModel
        ).filter_by(
            id=document_id
        )
    ).scalar_one()

    chapters = db.session.execute(
        db.select(
            ChapterModel
        ).filter_by(
            document_id=document_id
        ).order_by(
            ChapterModel.index.asc()
        )
    ).scalars().all()

    if not chapters:
        print(document.type)
        data = {
            "document_id": document_id,
            "type": document.type.value,
        }

        response = requests.post(url, headers=headers, json=data)
        print(response.status_code)
        print(response.json())
    else:
        if len(chapters) > 1:
            for index, chapter in enumerate(chapters):
                if chapter.index == 0:
                    continue

                data = {
                    "type": document.type.value,
                    "document_id": document_id,
                    "chapter_id": str(chapter.id),
                    "target_chapter_index": chapter.index - 1,
                    "chapter_index": chapter.index,
                    "chapter_count": len(chapters),
                    "has_chapter": True,
                    "multiple_save": index == len(chapters) - 1
                }
                # print(data)

                response = requests.post(url, headers=headers, json=data)
                print(response.status_code)
                print(response.text)
        else:
            chapter= chapters[0]
            data = {
                "type": document.type.value,
                "document_id": document_id,
                "chapter_id": str(chapter.id),
                "target_chapter_index": 0,
                "chapter_index": chapter.index,
                "chapter_count": len(chapters),
                "has_chapter": False,
                "multiple_save": False,
            }
            # print(data)

            response = requests.post(url, headers=headers, json=data)
            print(response.status_code)
            print(response.text)
