FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install --yes libzbar0

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY ./image_process.py .
COPY ./image-process.proto .
RUN python -m grpc_tools.protoc -I. --python_out=. --pyi_out=. --grpc_python_out=. ./image-process.proto

CMD ["python3", "image_process.py"]
