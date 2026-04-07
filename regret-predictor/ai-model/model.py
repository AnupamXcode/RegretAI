"""
model.py — Train and save logistic regression model for regret prediction.
Run: python model.py
"""
import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

# Load dataset
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
df = pd.read_csv(os.path.join(BASE_DIR, 'dataset.csv'))

features = ['emotion_score', 'risk_level', 'importance', 'uncertainty', 'time_horizon']
X = df[features].values
y = df['regret'].values

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train logistic regression
model = LogisticRegression(max_iter=1000, C=1.0, random_state=42)
model.fit(X_train_scaled, y_train)

# Evaluate
y_pred = model.predict(X_test_scaled)
accuracy = accuracy_score(y_test, y_pred)
print(f"✅ Model Accuracy: {accuracy:.2%}")
print(classification_report(y_test, y_pred, target_names=['No Regret', 'Regret']))

# Save model and scaler
joblib.dump(model, os.path.join(BASE_DIR, 'model.pkl'))
joblib.dump(scaler, os.path.join(BASE_DIR, 'scaler.pkl'))
print("✅ Model saved: model.pkl")
print("✅ Scaler saved: scaler.pkl")
