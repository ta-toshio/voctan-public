import json
import re

from instance.gemini import gemini_model, genai
# from utils.sentence_splitter import sentence_splitter


def get_chapter(file):
    inst = """
Instructions:
* get chapter number and title
* get first sentence only in each chapter.
* Do not break sentences incorrectly, for example Mr. and Ms. on the way.
"""

    r = gemini_model.generate_content(
        [file, inst],
        generation_config=genai.GenerationConfig(
            temperature=0,
            top_p=0.5,
            response_mime_type="application/json",
            response_schema={
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "chapter": {
                            "type": "number",
                        },
                        "title": {
                            "type": "string",
                        },
                        "first_sentence": {
                            "type": "string",
                        },
                    },
                },
            }
        ),
    )

    return json.loads(r.text)


def get_content(file):
    instructions = f"""
Instructions:
* Extract contents.
* Do not include programming code.
* No line breaks required.
"""

    try:
        r = gemini_model.generate_content(
            [file, instructions],
            generation_config=genai.GenerationConfig(
                temperature=0,
                # top_p=0.5,
            )
        )

        return re.sub(r"==End of OCR for page \d.+==$", '', r.text.rstrip()).rstrip()
    except Exception as e:
        print(e)
        print("An error occured in get_content")
        return ""


def get_content_with_chapter_info(file, chapter_num, chapter_title="", first_sentence=""):
    if chapter_title:
        chapter_title = f"The chapter title is \"{chapter_title}\"."

    if first_sentence:
        first_sentence = f"* The first sentence may start with the following sentence. {first_sentence}"

    instructions = f"""
Instructions:
* Extract entire contents from chapter {chapter_num}. {chapter_title}
{first_sentence}
* Do not include programming code.
* No line breaks required.
"""

    try:
        r = gemini_model.generate_content(
            [file, instructions],
            generation_config=genai.GenerationConfig(
                temperature=0,
                # top_p=0.5,
            )
        )

        return re.sub(r"==End of OCR for page \d.+==$", '', r.text.rstrip()).rstrip()
    except Exception as e:
        print(e)
        print("An error occurred in get_content")
        return ""


def list_index_of(needle, haystack):
    # haystack内にneedleが存在するかをチェック
    for i in range(len(haystack) - len(needle) + 1):
        t = haystack[i:i + 1]
        if haystack[i:i + len(needle)] == needle:
            return i
    return None


def get_all_contents(file, chapter_info, fn):

    if chapter_info is None:
        body = get_content(file)
        fn(body)

    else:
        for index, _chapter_info in enumerate(chapter_info):
            print("==========new chapter info process=======")
            print(_chapter_info)

            body = get_content_with_chapter_info(
                file,
                _chapter_info["chapter"],
                _chapter_info["title"],
                _chapter_info["first_sentence"],
            )

            fn(body, index)


# def get_all_contents(file, chapter_info):
#     former_chapter_body = []
#     len_chapter_index = len(chapter_info) - 1
#     last_chapter = chapter_info[len_chapter_index]["chapter"]
#
#     bodies = []
#     for index, _chapter_info in enumerate(chapter_info):
#         print("==========new chapter info process=======")
#         print(_chapter_info)
#
#         body = get_content(
#             file,
#             _chapter_info["chapter"],
#             _chapter_info["title"],
#             _chapter_info["first_sentence"],
#         )
#
#         sentences = sentence_splitter(body)
#
#         print(sentences)
#
#         if len(sentences) == 0:
#             former_chapter_body = []
#             bodies.append([])
#             continue
#
#         if len(chapter_info) == 1:
#             bodies.append(sentences)
#             break
#
#         if index == 0:
#             former_chapter_body = sentences
#             continue
#
#         if 3 < len(sentences):
#             duplicated_index = list_index_of(sentences[:3], former_chapter_body)
#             former_chapter_body = former_chapter_body[:duplicated_index]
#
#         bodies.append(former_chapter_body)
#         former_chapter_body = sentences
#
#         if _chapter_info["chapter"] == last_chapter:
#             bodies.append(sentences)
#
#     results = []
#     for i, body in enumerate(bodies):
#         results.append({
#             "chapter": chapter_info[i]["chapter"],
#             "contents": body,
#         })
#
#     return bodies
