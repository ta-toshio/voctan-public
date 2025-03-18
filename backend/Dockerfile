FROM python:3.12-slim

WORKDIR /app

RUN set -eux; \
    apt-get update; \
    apt-get -y install \
        default-libmysqlclient-dev \
        build-essential \
        pkg-config;

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

#CMD ["flask", "run", "--host", "0.0.0.0"]
CMD ["/bin/bash", "docker-entrypoint.sh"]
