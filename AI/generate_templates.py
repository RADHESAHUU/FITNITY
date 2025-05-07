import json
import random

# Define categories and templates
categories = {
    "Fitness Q&A": [
        "How do I improve my {exercise} form?",
        "What’s the best workout for {muscle_group}?",
        "How often should I train my {muscle_group}?",
        "What are the benefits of {exercise}?"
    ],
    "Diet Help": [
        "What are the best foods for {goal}?",
        "How do I track my {nutrient} intake?",
        "What’s a healthy substitute for {unhealthy_food}?",
        "How much {nutrient} do I need daily?"
    ],
    "Sleep Tracking": [
        "How can I improve my sleep quality?",
        "What’s the ideal bedtime for {age_group}?",
        "How does {habit} affect sleep?",
        "What are the best tips for falling asleep faster?"
    ],
    "Progress Motivation": [
        "How do I stay motivated to achieve my {goal}?",
        "What are some tips to overcome {challenge}?",
        "How do I track my progress in {activity}?",
        "What’s the best way to celebrate {milestone}?"
    ]
}

# Define variables for templates
variables = {
    "exercise": ["squats", "push-ups", "deadlifts", "planks"],
    "muscle_group": ["legs", "arms", "back", "core"],
    "goal": ["weight loss", "muscle gain", "better sleep", "more energy"],
    "nutrient": ["protein", "carbs", "fats", "fiber"],
    "unhealthy_food": ["soda", "chips", "candy", "fast food"],
    "age_group": ["teenagers", "adults", "seniors"],
    "habit": ["screen time", "caffeine", "exercise", "diet"],
    "challenge": ["lack of time", "low energy", "plateaus", "injuries"],
    "activity": ["running", "weightlifting", "yoga", "cycling"],
    "milestone": ["losing 5kg", "running a marathon", "lifting 100kg", "meditating daily"]
}

# Generate entries
entries = []
for category, templates in categories.items():
    for _ in range(200):
        template = random.choice(templates)
        question = template.format(**{key: random.choice(values) for key, values in variables.items() if f"{{{key}}}" in template})
        answer = f"This is a placeholder answer for: {question}"
        entries.append({"category": category, "question": question, "answer": answer})

# Save to JSON file
output_file = "generated_templates.json"
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(entries, f, ensure_ascii=False, indent=4)

print(f"Generated {len(entries)} entries and saved to {output_file}.")