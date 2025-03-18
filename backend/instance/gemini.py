import os

import google.generativeai as _genai

_genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# gemini_model = _genai.GenerativeModel('gemini-1.5-flash')
gemini_model = _genai.GenerativeModel('gemini-1.5-flash-exp-0827')
genai = _genai
