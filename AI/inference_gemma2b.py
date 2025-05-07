import os
from transformers import AutoTokenizer, AutoModelForCausalLM
import pyttsx3
import speech_recognition as sr
from flask import Flask, request, jsonify
import logging
from langdetect import detect
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
load_dotenv()
API_KEY = os.getenv('API_KEY', 'default_key')

# Securely fetch the Hugging Face token from the .env file
HUGGINGFACE_TOKEN = os.getenv("HUGGINGFACE_TOKEN")
if not HUGGINGFACE_TOKEN:
    raise ValueError("HUGGINGFACE_TOKEN is not set in the .env file.")

try:
    # Load the tokenizer and model using the Hugging Face token
    print("Loading the tokenizer and model...")
    tokenizer = AutoTokenizer.from_pretrained("meta-llama/Meta-Llama-3-8B", use_auth_token=HUGGINGFACE_TOKEN)
    model = AutoModelForCausalLM.from_pretrained("meta-llama/Meta-Llama-3-8B", use_auth_token=HUGGINGFACE_TOKEN)
    print("Model and tokenizer loaded successfully.")
except Exception as e:
    print(f"Error loading the model or tokenizer: {e}")

# Context memory for chatbot
context_memory = []
MAX_CONTEXT_LENGTH = 5

def initialize_tts():
    engine = pyttsx3.init()
    engine.setProperty('rate', 150)  # Set speaking rate
    engine.setProperty('volume', 1.0)  # Set volume level
    return engine

def speak_text(engine, text):
    engine.say(text)
    engine.runAndWait()

def transcribe_speech():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        try:
            audio = recognizer.listen(source, timeout=5)
            print("Processing...")
            return recognizer.recognize_google(audio, language="hi-IN,en-US")
        except sr.UnknownValueError:
            print("Sorry, I could not understand the audio.")
            return None
        except sr.RequestError:
            print("Speech recognition service is unavailable.")
            return None
        except sr.WaitTimeoutError:
            print("No speech detected. Please try again.")
            return None
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            return None

# Enhanced to explicitly handle English and Hindi input and generate responses in the same language
def detect_language(text):
    try:
        return detect(text)
    except Exception:
        return "unknown"

# Chat interface
def chat():
    print("Welcome to Fitnity AI Chatbot! Type 'exit' to end the chat.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            print("Goodbye! Stay fit and healthy!")
            break

        # Detect language
        language = detect_language(user_input)

        # Tokenize user input
        inputs = tokenizer(user_input, return_tensors="pt")

        # Generate response
        outputs = model.generate(
            inputs.input_ids,
            max_length=150,
            num_return_sequences=1,
            pad_token_id=tokenizer.eos_token_id
        )

        # Decode and print response
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        print(f"Fitnity AI ({language.capitalize()}): {response}")

# Voice chat interface
def voice_chat():
    tts_engine = initialize_tts()
    print("Welcome to Fitnity AI Voice Chatbot! Say 'exit' to end the chat.")
    while True:
        user_input = transcribe_speech()
        if user_input is None:
            continue

        print(f"You: {user_input}")
        if user_input.lower() == 'exit':
            print("Goodbye! Stay fit and healthy!")
            speak_text(tts_engine, "Goodbye! Stay fit and healthy!")
            break

        # Detect language
        language = detect_language(user_input)

        # Tokenize user input
        inputs = tokenizer(user_input, return_tensors="pt")

        # Generate response
        outputs = model.generate(
            inputs.input_ids,
            max_length=150,
            num_return_sequences=1,
            pad_token_id=tokenizer.eos_token_id
        )

        # Decode and print response
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        print(f"Fitnity AI ({language.capitalize()}): {response}")

        # Speak the response
        speak_text(tts_engine, response)

# Initialize Flask app
app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.before_request
def log_request_info():
    logger.info(f"Request: {request.method} {request.url} - Body: {request.get_json()}")

@app.after_request
def log_response_info(response):
    logger.info(f"Response: {response.status_code} - {response.get_json()}")
    return response

@app.before_request
def authenticate():
    key = request.headers.get('Authorization')
    if key != f"Bearer {API_KEY}":
        return jsonify({'error': 'Unauthorized'}), 401

@app.errorhandler(Exception)
def handle_exception(e):
    logger.error(f"Error: {str(e)}")
    return jsonify({'error': 'An internal error occurred'}), 500

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Get user input from the request
        user_input = request.json.get('input', '')
        if not user_input:
            return jsonify({'error': 'Input text is required'}), 400

        # Maintain context memory
        context_memory.append(user_input)
        if len(context_memory) > MAX_CONTEXT_LENGTH:
            context_memory.pop(0)

        # Combine context for input
        combined_input = "\n".join(context_memory)

        # Detect language
        language = detect_language(user_input)

        # Tokenize combined input
        inputs = tokenizer(combined_input, return_tensors="pt")

        # Generate response
        outputs = model.generate(
            inputs.input_ids,
            max_length=150,
            num_return_sequences=1,
            pad_token_id=tokenizer.eos_token_id
        )

        # Decode response
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)

        return jsonify({'response': response, 'language': language})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    mode = input("Choose mode: 'text', 'voice', or 'api': ").strip().lower()
    if mode == 'api':
        app.run(host='0.0.0.0', port=5000)
    elif mode == 'voice':
        voice_chat()
    else:
        chat()