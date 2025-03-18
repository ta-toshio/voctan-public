from models import ChapterModel


def chapter_factory(document_id: str, index: int, name: str, title: str):
    return ChapterModel(document_id=document_id, index=index, name=name, title=title)
