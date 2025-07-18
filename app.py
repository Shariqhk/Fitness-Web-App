# File: app.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/generate-plan", methods=["POST"])
def generate_plan():
    data = request.json
    mass = data["mass"]
    level = data["level"]
    goal = data["goal"]
    equipment = data["equipment"]
    frequency = data["frequency"]

    # Simplified plan logic
    plan = f"""
    🏋️ Personalized Workout Plan:
    • Goal: {goal}
    • Fitness Level: {level}
    • Equipment: {equipment}
    • Frequency: {frequency} days/week
    • Mass: {mass}kg

    🔹 Sample Workout:
    - Day 1: Full Body Strength
    - Day 2: {goal}-focused HIIT
    - Day 3: Rest
    - Day 4: {equipment}-based Routine
    - Repeat based on {frequency} days/week
    """

    return jsonify({"plan": plan.strip()})


if __name__ == "__main__":
    app.run()
