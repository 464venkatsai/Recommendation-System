# Use the Python 3.8 Alpine image as the base image
FROM python:3.10-alpine

# Set the working directory within the container
WORKDIR /app

# Copy the local directory contents into the container at /app
COPY . /app

# ENV DEBIAN_FRONTEND=noninteractive
# RUN apt update && apt install -y build-essential && rm -rf /var/lib/apt/lists/*
# Install Python dependencies
RUN pip install scikit-learn==1.3.0
RUN pip install -r requirements.txt

# Command to run the FastAPI application using Uvicorn with hot reload
CMD ["uvicorn backend.app.main:app --reload"]
