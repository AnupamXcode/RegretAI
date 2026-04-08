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
```bash
cd ai-model
pip install -r requirements.txt
python app.py
```

---

## 🔐 Environment Variables

Create `.env` file in `server/`:
```env
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key
AI_SERVICE_URL=http://localhost:5001
```

Create `.env` in root for Docker Compose:
```env
VITE_API_URL=http://localhost:5000
NODE_ENV=development
FLASK_ENV=development
```

---

## 🚀 Deployment

RegretAI can be deployed using:
- **GitHub Pages** (Frontend)
- **Render.com** (Backend)
- **Railway.app** (AI Model)
- **Docker** (All services)

### Quick Deploy (Recommended)

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete instructions on:
- ✅ GitHub Pages deployment
- ✅ Render.com setup
- ✅ Railway.app configuration
- ✅ Docker Compose
- ✅ Environment setup
- ✅ Troubleshooting

### Docker Deployment (Local Testing)

```bash
# Build and run all services
docker-compose up --build

# Services will be available at:
# Frontend: http://localhost:5173
# Backend: http://localhost:5000
# AI Model: http://localhost:5001
```

### GitHub Actions CI/CD

Push to `main` branch to trigger automatic deployment:
```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m "Add new feature"`
4. Push branch: `git push origin feature/new-feature`
5. Open pull request

---

## 📝 License

MIT License - See LICENSE file for details

---

## 👨‍💻 Author

**Anupam Shrivastava** - [GitHub](https://github.com/AnupamXcode)

---

## 📧 Support

For issues, questions, or suggestions:
1. Open an [GitHub Issue](https://github.com/AnupamXcode/RegretAI/issues)
2. Email: anupam@example.com
3. Check [Troubleshooting Guide](./DEPLOYMENT_GUIDE.md#troubleshooting)

---

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Collaborative decision-making
- [ ] API for third-party integrations
- [ ] Premium ML models
- [ ] Real-time notifications
- [ ] Multi-language support
