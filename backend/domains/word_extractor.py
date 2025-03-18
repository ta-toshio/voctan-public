# import re
# from typing import List, TypedDict
#
# from instance.nlp import nlp
#
#
# class Word(TypedDict):
#     lemma: str
#     raw: str
#
#
# Words = List[Word]
#
#
# class SentenceParsingResult(TypedDict):
#     words: List[Word]
#     sentence: str
#
#
# def is_number(word):
#     # 数字かどうかを判定
#     return word.isdigit() or re.match(r'^\d+(\.\d+)?$', word)
#
#
# def is_alphabetic_number(word):
#     # アルファベットで表された数字を判定
#     alphabetic_numbers = {
#         'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
#         'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
#         'eighteen', 'nineteen', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy',
#         'eighty', 'ninety', 'hundred', 'thousand', 'million', 'billion'
#     }
#     return word.lower() in alphabetic_numbers
#
#
# def unique_words(words: Words) -> Words:
#     seen = set()
#     unique = []
#     for word in words:
#         if word['lemma'] not in seen:
#             seen.add(word['lemma'])
#             unique.append(word)
#     return unique
#
#
# def revalidate_words(words: Words) -> Words:
#     for word in words:
#         if word['lemma'] != word['raw']:
#             continue
#         token = nlp(word['raw'])[0]
#         word['lemma'] = token.lemma_
#     return words
#
#
# def is_valid_phrase(phrase):
#     words = phrase.split()
#     if len(words) < 2:
#         return False
#     for word in words:
#         if is_number(word) or is_alphabetic_number(word) or len(word) == 1:
#             return False
#     return True
#
#
# def is_valid_word(word):
#     return len(word) > 1 and word.isalpha()
#
#
# def extract_phrases_and_words(text) -> (List[str], Words):
#     doc = nlp(text)
#     phrases = set()
#     phrase_tokens = set()
#     words: Words = []
#
#     """
#     特定の品詞を除外
#     CCONJ: Coordinating Conjunction（等位接続詞）
#     CONJ: Conjunction（接続詞）
#     PUNCT: Punctuation（句読点）
#     DET: Determiner（限定詞）
#     PRON: Pronoun（代名詞）
#     ADP: Adposition（前置詞や後置詞）
#     AUX: Auxiliary（助動詞）
#     PART: Particle（助詞）
#     NUM: Numeral（数詞）
#     """
#     exclude_pos = {'CCONJ', 'CONJ', 'PUNCT', 'DET', 'PRON', 'ADP', 'AUX', 'PART', 'NUM'}
#
#     exclude_pronouns = {'i', 'me', 'my', 'mine', 'myself', 'we', 'us', 'our', 'ours', 'ourselves',
#                         'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself',
#                         'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their',
#                         'theirs', 'themselves', 'this', 'that', 'these', 'those'}
#
#     """
#     PERSON: 人名
#     ORG: 組織名
#     GPE: 地理的実体（国、都市、州など）
#     DATE: 日付
#     TIME: 時間
#     MONEY: 金額
#     QUANTITY: 量
#     ORDINAL: 序数（例: first, second）
#     CARDINAL: 基数（例: one, two）
#     """
#     exclude_ent_types = {'PERSON', 'ORG', 'GPE', 'DATE', 'TIME', 'MONEY', 'QUANTITY', 'ORDINAL', 'CARDINAL'}
#
#     # for token in doc:
#     #     # 複合動詞（phrasal verbs）の抽出
#     #     if token.dep_ in ("prt", "prep") and token.head.pos_ == "VERB":
#     #         phrase = f"{token.head.text} {token.text}"
#     #         if is_valid_phrase(phrase):
#     #             phrases.add(phrase)
#     #             phrase_tokens.add(token.head.text)
#     #             phrase_tokens.add(token.text)
#
#     #     # 複合名詞の抽出
#     #     if token.dep_ == "compound" and token.head.pos_ == "NOUN":
#     #         phrase = f"{token.text} {token.head.text}"
#     #         if is_valid_phrase(phrase):
#     #             phrases.add(phrase)
#     #             phrase_tokens.add(token.head.text)
#     #             phrase_tokens.add(token.text)
#
#     # for chunk in doc.noun_chunks:
#     #     if len(chunk.text.split()) > 1 and chunk.root.dep_ == 'compound':
#     #         phrase = chunk.text
#     #         if is_valid_phrase(phrase):
#     #             phrases.add(phrase)
#     #             for word in chunk.text.split():
#     #                 phrase_tokens.add(word)
#
#     for token in doc:
#         if (
#                 token.ent_type_ not in exclude_ent_types and
#                 token.pos_ not in exclude_pos and
#                 token.text.lower() not in exclude_pronouns and
#                 token.text not in phrase_tokens and
#                 not is_number(token.text) and
#                 not is_alphabetic_number(token.text) and
#                 is_valid_word(token.text)
#         ):
#             words.append(Word(lemma=token.lemma_, raw=token.text))
#
#     return list(phrases), list(words)
