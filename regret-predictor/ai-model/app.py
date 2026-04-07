"""
app.py — Flask microservice for regret prediction.
Run: python app.py  (starts on port 5001)
"""
import os
import json
import numpy as np
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'model.pkl')
SCALER_PATH = os.path.join(BASE_DIR, 'scaler.pkl')

# Load or train model on startup
def load_model():
    if not os.path.exists(MODEL_PATH) or not os.path.exists(SCALER_PATH):
        print("⚠️  Model not found. Training now...")
        import subprocess, sys
        subprocess.run([sys.executable, os.path.join(BASE_DIR, 'model.py')], check=True)
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    return model, scaler

model, scaler = load_model()
print("✅ Model loaded successfully")


def build_explanation(emotion_score, risk_level, importance, uncertainty, time_horizon, probability):
    parts = []
    if emotion_score < 0.4:
        parts.append("negative emotional state increases regret risk")
    if uncertainty > 60:
        parts.append("high uncertainty makes outcomes harder to predict")
    if risk_level > 65:
        parts.append("elevated risk level contributes to potential regret")
    if importance == 2:
        parts.append("high-importance decisions carry significant emotional weight")
    if time_horizon == 1:
        parts.append("long-term decisions are harder to reverse")
    if not parts:
        parts.append("balanced factors indicate moderate regret risk")

    if probability > 65:
        prefix = "⚠️ High regret risk detected"
    elif probability > 40:
        prefix = "⚡ Moderate regret risk"
    else:
        prefix = "✅ Low regret risk"

    return f"{prefix}: {', '.join(parts)}."


def build_suggestions(probability, risk_level, uncertainty, emotion_score):
    suggestions = []
    if probability > 70:
        suggestions.append("Consider delaying this decision until you feel more certain.")
    if risk_level > 65:
        suggestions.append("Explore a safer alternative option before committing.")
    if uncertainty > 60:
        suggestions.append("Gather more information before making a final choice.")
    if emotion_score < 0.3:
        suggestions.append("Your current emotional state may cloud judgment — take a break first.")
    if probability > 50:
        suggestions.append("Discuss this decision with a trusted advisor.")
    suggestions.append("Document your reasoning now so you can review it later.")
    return suggestions[:4]


@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "service": "regret-predictor-ai"})


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        required = ['emotion_score', 'risk_level', 'importance', 'uncertainty', 'time_horizon']
        for field in required:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        emotion_score = float(data['emotion_score'])
        risk_level = float(data['risk_level'])
        importance = int(data['importance'])
        uncertainty = float(data['uncertainty'])
        time_horizon = int(data['time_horizon'])

        features = np.array([[emotion_score, risk_level, importance, uncertainty, time_horizon]])
        features_scaled = scaler.transform(features)

        # Get probability from model
        prob_array = model.predict_proba(features_scaled)[0]
        regret_probability = int(round(prob_array[1] * 100))

        # Confidence = distance from 50% boundary (scaled to 60–99%)
        raw_confidence = abs(prob_array[1] - 0.5) * 2  # 0..1
        confidence = int(60 + raw_confidence * 39)

        explanation = build_explanation(emotion_score, risk_level, importance, uncertainty, time_horizon, regret_probability)
        suggestions = build_suggestions(regret_probability, risk_level, uncertainty, emotion_score)

        # Top factors
        feature_names = ['Emotional State', 'Risk Level', 'Importance', 'Uncertainty', 'Time Horizon']
        feature_values = [1 - emotion_score, risk_level / 100, importance / 2, uncertainty / 100, time_horizon]
        top_factors = sorted(
            [{"factor": name, "impact": round(val * 100)} for name, val in zip(feature_names, feature_values)],
            key=lambda x: x['impact'],
            reverse=True
        )[:3]

        return jsonify({
            "regret_probability": max(2, min(98, regret_probability)),
            "confidence": confidence,
            "explanation": explanation,
            "suggestions": suggestions,
            "top_factors": top_factors
        })

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    print("🚀 AI Regret Prediction Service running on port 5001")
    app.run(host='0.0.0.0', port=5001, debug=False)
