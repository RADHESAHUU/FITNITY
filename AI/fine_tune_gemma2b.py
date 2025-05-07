# Ensure required libraries are installed
# Run the following commands in your terminal if you encounter missing imports:
# pip install peft datasets transformers

import json
from transformers import AutoTokenizer, AutoModelForCausalLM, Trainer, TrainingArguments
from peft import LoraConfig, get_peft_model
from datasets import Dataset, DatasetDict
from sklearn.model_selection import train_test_split

# Load the dataset
def load_dataset(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = [json.loads(line) for line in f]
    return Dataset.from_list(data)

# Tokenize the dataset
def tokenize_function(examples):
    return tokenizer(examples['prompt'] + examples['completion'], truncation=True, padding='max_length', max_length=512)

# Paths and configurations
DATASET_PATH = "d:/fitinity/AI/fitnity_training_data.jsonl"
MODEL_PATH = "google/gemma-2b-it"
OUTPUT_DIR = "d:/fitinity/AI/fine_tuned_fitnity_model"

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
model = AutoModelForCausalLM.from_pretrained(MODEL_PATH)

# Apply LoRA for efficient fine-tuning
lora_config = LoraConfig(
    r=8, lora_alpha=32, target_modules=["q_proj", "v_proj"], lora_dropout=0.1, bias="none"
)
model = get_peft_model(model, lora_config)

# Split the dataset into training and evaluation sets
def split_dataset(dataset):
    train_data, eval_data = train_test_split(dataset, test_size=0.2, random_state=42)
    return DatasetDict({
        'train': Dataset.from_list(train_data),
        'eval': Dataset.from_list(eval_data)
    })

# Load and preprocess the dataset
dataset = load_dataset(DATASET_PATH)
dataset = split_dataset(dataset)
tokenized_dataset = dataset.map(tokenize_function, batched=True)

# Training arguments
training_args = TrainingArguments(
    output_dir=OUTPUT_DIR,
    evaluation_strategy="epoch",
    learning_rate=5e-5,
    per_device_train_batch_size=8,
    num_train_epochs=3,
    save_strategy="epoch",
    logging_dir=f"{OUTPUT_DIR}/logs",
    logging_steps=10,
    save_total_limit=2,
    fp16=True,
    push_to_hub=False,
    eval_steps=500,
    load_best_model_at_end=True
)

# Trainer setup
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset['train'],
    eval_dataset=tokenized_dataset['eval'],
    tokenizer=tokenizer,
    compute_metrics=lambda p: {'accuracy': (p.predictions.argmax(-1) == p.label_ids).mean()}
)

# Fine-tune the model
trainer.train()

# Save the fine-tuned model and tokenizer
model.save_pretrained(OUTPUT_DIR)
tokenizer.save_pretrained(OUTPUT_DIR)

print("Fine-tuning complete. Model saved to:", OUTPUT_DIR)