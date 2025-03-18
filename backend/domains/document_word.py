from models import WordModel


def find_word(lemma: str, raw) -> WordModel:
    word = WordModel.query.filter_by(word=lemma).first()
    if word:
        return word
    return WordModel.query.filter_by(word=raw).first()
