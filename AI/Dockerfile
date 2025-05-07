# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install system dependencies for speech recognition and TTS
RUN apt-get update && apt-get install -y \
    ffmpeg \
    espeak \
    portaudio19-dev \
    && rm -rf /var/lib/apt/lists/*

# Install required libraries
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port the app runs on
EXPOSE 5000

# Define environment variable for Flask
ENV FLASK_APP=inference_gemma2b.py

# Run the application
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]