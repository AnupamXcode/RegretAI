# 🚀 FutureSense AI — Regret Prediction System

> **Predict the future impact of your decisions. Reduce regret. Improve clarity.**

FutureSense AI is an advanced **decision intelligence platform** that combines **Machine Learning + Behavioral Psychology** to estimate the probability of future regret and guide users toward better choices.

---

## ✨ Key Highlights

- 📊 Predicts **Regret Probability (0–100%)**
- 🧠 Combines **emotion + logic + uncertainty**
- 🧾 Provides **Explainable AI insights**
- 🤖 Generates **actionable suggestions (Gemini AI)**
- 📈 Tracks decision history & patterns

---

## 🧠 Overview

Most decisions are influenced by **bias, emotion, and uncertainty**.

FutureSense AI transforms this into:
- **Structured inputs → Quantified predictions**
- **Raw data → Human-readable explanations**
- **Uncertainty → Actionable clarity**

---

## 🌟 Features

### 🔍 AI Regret Prediction Engine
- Logistic Regression (scikit-learn)
- Multi-factor analysis:
  - Emotion
  - Risk tolerance
  - Uncertainty
  - Importance
  - Time horizon
- Outputs **interpretable probability score**

---

### 😊 Emotional Intelligence Layer
- Supports emotional states:
  - Happy, Neutral, Confused, Sad, Angry
- Accounts for **psychological bias in decisions**

---

### 🎨 Modern UI Experience
- Glassmorphism design system
- Smooth animations (Framer Motion)
- Fully responsive (mobile + desktop)

---

### 📊 Decision History & Analytics
- Save and revisit decisions
- Track prediction trends over time
- Identify behavioral patterns

---

### 🤖 Hybrid AI Intelligence
- Combines:
  - ML predictions (quantitative)
  - Gemini AI insights (qualitative)
- Provides:
  - Suggestions
  - Explanations
  - Improvement strategies

---

## 🛠️ Tech Stack

| Layer        | Technology |
|--------------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion |
| **Backend**  | Node.js, Express, JWT Authentication |
| **AI Service** | Python, Flask, Scikit-learn, NumPy |
| **Database** | MongoDB (Mongoose) |

---


## 📂 Project Structure

---

## 🔄 Workflow

1. User inputs decision parameters  
2. Backend sends data to AI service  
3. ML model predicts regret probability  
4. Gemini generates insights  
5. Results displayed with explanation  

---

## ⚙️ Setup

### 1. Clone Repo
```bash
git clone https://github.com/AnupamXcode/RegretAI.git
cd RegretAI
```
## 2. Frontend
```
cd client
npm install
npm run dev
```
3. Backend
```bash
cd server
npm install
npm start
```
4. AI Service
```
cd ai-model
pip install -r requirements.txt
python app.py
````
🔐 Environment Variables

Create .env file in server:
```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key
```
