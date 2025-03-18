import os
import json
import re
from typing import List, TypedDict
import spacy
import boto3

nlp = spacy.load('en_core_web_sm')

# bucket_name = 'v-word-dev'
bucket_name = os.environ['BUCKET_NAME']


def lambda_handler(event, context):
    type = event.get('type')

    if type == 'VIDEO' or type == 'WEB':
        return process_on_youtube_or_web(event, context)
    elif type == 'BOOK':
        return process_on_book(event, context)
    else:
        raise Exception("Invalid type")


def process_on_youtube_or_web(event, context):
    type = event.get('type')
    document_id = event.get('document_id')
    # sentences = event.get('sentences')
    sentences = get_s3(bucket_name, f"document/{document_id}/sentences.json")

    document_words = split_words(sentences)
    save_s3(
        json.dumps(document_words),
        bucket_name,
        f"document/{document_id}/words.json"
    )

    return {
        "type": type,
        "document_id": document_id,
        # "document_words": document_words
    }


def process_on_book(event, context):
    type = event.get('type')
    document_id = event['document_id']
    chapter_id = event['chapter_id']
    chapter_index = int(event['chapter_index'])
    chapter_count = int(event['chapter_count'])
    has_chapter = bool(event['has_chapter'])
    target_chapter_index = chapter_index
    multiple_save = False

    if has_chapter and chapter_index > 0:
        target_chapter_index -= 1

        sentences = get_s3(bucket_name, f"document/{document_id}/{target_chapter_index}/sentences.json")
        document_words = split_words(sentences)
        save_s3(
            json.dumps(document_words),
            bucket_name,
            f"document/{document_id}/{target_chapter_index}/words.json"
        )

        if chapter_index == (chapter_count - 1):
            sentences = get_s3(bucket_name, f"document/{document_id}/{chapter_index}/sentences.json")
            document_words = split_words(sentences)
            save_s3(
                json.dumps(document_words),
                bucket_name,
                f"document/{document_id}/{chapter_index}/words.json"
            )
            multiple_save = True
    else:
        sentences = get_s3(bucket_name, f"document/{document_id}/{chapter_index}/sentences.json")
        document_words = split_words(sentences)
        save_s3(
            json.dumps(document_words),
            bucket_name,
            f"document/{document_id}/{chapter_index}/words.json"
        )

    return {
        "type": type,
        "document_id": document_id,
        "chapter_id": chapter_id,
        "chapter_index": chapter_index,
        "chapter_count": chapter_count,
        "has_chapter": has_chapter,
        "target_chapter_index": target_chapter_index,
        "multiple_save": multiple_save,
    }


def split_words(sentences):
    lemma_in_chapter_set = set()
    document_words = []

    # 文ごとに単語抽出
    for j, sentence in enumerate(sentences):
        _, words = extract_phrases_and_words(sentence)
        words = unique_words(words)
        words = revalidate_words(words)

        examples = combine_adjacent_sentences(sentences, j, 30)

        for word in words:
            if word["lemma"] in lemma_in_chapter_set:
                continue

            lemma_in_chapter_set.add(word["lemma"])

            document_words.append({
                "lemma": word["lemma"],
                "raw": word["raw"],
                "sentence": examples,
                "duplication": False,
            })

    return document_words


class Word(TypedDict):
    lemma: str
    raw: str


Words = List[Word]


class SentenceParsingResult(TypedDict):
    words: List[Word]
    sentence: str


class DocumentWord(TypedDict):
    word: Word
    sentence: str
    duplication: bool


def is_number(word):
    # 数字かどうかを判定
    return word.isdigit() or re.match(r'^\d+(\.\d+)?$', word)


def is_alphabetic_number(word):
    # アルファベットで表された数字を判定
    alphabetic_numbers = {
        'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
        'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
        'eighteen', 'nineteen', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy',
        'eighty', 'ninety', 'hundred', 'thousand', 'million', 'billion'
    }
    return word.lower() in alphabetic_numbers


def unique_words(words: Words) -> Words:
    seen = set()
    unique = []
    for word in words:
        if word['lemma'] not in seen:
            seen.add(word['lemma'])
            unique.append(word)
    return unique


def revalidate_words(words: Words) -> Words:
    for word in words:
        if word['lemma'] != word['raw']:
            continue
        token = nlp(word['raw'])[0]
        word['lemma'] = token.lemma_
    return words


def is_valid_phrase(phrase):
    words = phrase.split()
    if len(words) < 2:
        return False
    for word in words:
        if is_number(word) or is_alphabetic_number(word) or len(word) == 1:
            return False
    return True


def is_valid_word(word):
    return len(word) > 1 and word.isalpha()


def extract_phrases_and_words(text) -> (List[str], Words):
    doc = nlp(text)
    phrases = set()
    phrase_tokens = set()
    words: Words = []

    """
    特定の品詞を除外
    CCONJ: Coordinating Conjunction（等位接続詞）
    CONJ: Conjunction（接続詞）
    PUNCT: Punctuation（句読点）
    DET: Determiner（限定詞）
    PRON: Pronoun（代名詞）
    ADP: Adposition（前置詞や後置詞）
    AUX: Auxiliary（助動詞）
    PART: Particle（助詞）
    NUM: Numeral（数詞）
    """
    exclude_pos = {'CCONJ', 'CONJ', 'PUNCT', 'DET', 'PRON', 'ADP', 'AUX', 'PART', 'NUM'}

    exclude_pronouns = {'i', 'me', 'my', 'mine', 'myself', 'we', 'us', 'our', 'ours', 'ourselves',
                        'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself',
                        'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their',
                        'theirs', 'themselves', 'this', 'that', 'these', 'those'}

    """
    PERSON: 人名
    ORG: 組織名
    GPE: 地理的実体（国、都市、州など）
    DATE: 日付
    TIME: 時間
    MONEY: 金額
    QUANTITY: 量
    ORDINAL: 序数（例: first, second）
    CARDINAL: 基数（例: one, two）
    """
    exclude_ent_types = {'PERSON', 'ORG', 'GPE', 'DATE', 'TIME', 'MONEY', 'QUANTITY', 'ORDINAL', 'CARDINAL'}

    # for token in doc:
    #     # 複合動詞（phrasal verbs）の抽出
    #     if token.dep_ in ("prt", "prep") and token.head.pos_ == "VERB":
    #         phrase = f"{token.head.text} {token.text}"
    #         if is_valid_phrase(phrase):
    #             phrases.add(phrase)
    #             phrase_tokens.add(token.head.text)
    #             phrase_tokens.add(token.text)

    #     # 複合名詞の抽出
    #     if token.dep_ == "compound" and token.head.pos_ == "NOUN":
    #         phrase = f"{token.text} {token.head.text}"
    #         if is_valid_phrase(phrase):
    #             phrases.add(phrase)
    #             phrase_tokens.add(token.head.text)
    #             phrase_tokens.add(token.text)

    # for chunk in doc.noun_chunks:
    #     if len(chunk.text.split()) > 1 and chunk.root.dep_ == 'compound':
    #         phrase = chunk.text
    #         if is_valid_phrase(phrase):
    #             phrases.add(phrase)
    #             for word in chunk.text.split():
    #                 phrase_tokens.add(word)

    for token in doc:
        if (
                token.ent_type_ not in exclude_ent_types and
                token.pos_ not in exclude_pos and
                token.text.lower() not in exclude_pronouns and
                token.text not in phrase_tokens and
                not is_number(token.text) and
                not is_alphabetic_number(token.text) and
                is_valid_word(token.text)
        ):
            words.append(Word(lemma=token.lemma_, raw=token.text))

    return list(phrases), list(words)


def custom_serializer(obj):
    if isinstance(obj, MyClass):
        return obj.__dict__
    raise TypeError(f"Type {type(obj)} not serializable")


class Word(TypedDict):
    lemma: str
    raw: str


def combine_adjacent_sentences(sentences: List[str], index: int, max_length: int = 30) -> str:
    sentence = sentences[index]
    if len(sentence) < max_length:
        if index > 0:
            sentence = sentences[index - 1] + " " + sentence
        if len(sentence) < max_length * 1.5 and index + 1 < len(sentences):
            sentence += " " + sentences[index + 1]
        if len(sentence) < max_length * 1.5 and index == 0 and index + 2 < len(sentences):
            sentence += " " + sentences[index + 2]
    return sentence


def save_s3(code, s3_bucket, s3_key):
    s3 = boto3.client('s3')
    s3.put_object(Bucket=s3_bucket, Key=s3_key, Body=code)


def get_s3(bucket_name, file_key):
    s3 = boto3.client('s3')
    response = s3.get_object(
        Bucket=bucket_name,
        Key=file_key,
    )
    return json.loads(response['Body'].read().decode('utf-8'))
