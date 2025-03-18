FROM public.ecr.aws/lambda/python:3.12

COPY requirements.txt ./
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt && \
    rm -rf ~/.cache/pip

ENV HF_HOME=/var/cache/transformers
RUN python -c "from wtpsplit import SaT; \
satsm = SaT('sat-3l-sm')"

COPY app.py .

CMD ["app.lambda_handler"]