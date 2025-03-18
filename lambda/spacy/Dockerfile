FROM public.ecr.aws/lambda/python:3.12

COPY requirements.txt ./
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt --target "${LAMBDA_TASK_ROOT}" && \
    rm -rf ~/.cache/pip

RUN python -m spacy download en_core_web_sm

COPY app.py ${LAMBDA_TASK_ROOT}

CMD ["app.lambda_handler"]