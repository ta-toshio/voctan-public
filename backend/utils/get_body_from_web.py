import newspaper


def get_body_from_web(url: str):
    article = newspaper.article(url)
    return article.title, article.text
