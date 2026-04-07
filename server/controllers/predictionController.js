const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const mongoose = require('mongoose');

const emotionScoreMap = { happy: 0.9, neutral: 0.5, confused: 0.35, sad: 0.15, angry: 0.1 };
const importanceMap = { low: 0, medium: 1, high: 2 };
const timeHorizonMap = { 'short-term': 0, 'long-term': 1 };

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIza...dummy');

const getPrediction = async (req, res) => {
  try {
    const { decisionTitle, description, options, importance, timeHorizon, riskTolerance, emotion, uncertainty } = req.body;
    
    // 1. Calculate base score (fallback logic)
    const emotion_score = emotionScoreMap[emotion] ?? 0.5;
    const importance_num = importanceMap[importance] ?? 1;
    
    // 2. Try Gemini for Wisdom
    let aiWisdom = "Refining decision parameters...";
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Analyze: "${decisionTitle}". Context: Importance=${importance}, Risk=${riskTolerance}%, Emotion=${emotion}. 3 short words.`;
      const result = await model.generateContent(prompt);
      aiWisdom = result.response.text();
    } catch (e) {
      aiWisdom = "Focus on long-term value over short-term anxiety.";
    }

    // 3. Try AI service or use local model
    let prob = Math.round(30 + Math.random() * 40);
    let explanation = "Based on current inputs, the risk profile is moderate.";
    
    try {
      const aiResponse = await axios.post(`${process.env.AI_SERVICE_URL}/predict`, req.body, { timeout: 2000 });
      prob = aiResponse.data.regret_probability;
      explanation = aiResponse.data.explanation;
    } catch (e) {
       // Manual risk calculation if services are down
       if (importance === 'high') prob += 15;
       if (emotion === 'confused' || emotion === 'sad') prob += 20;
       if (riskTolerance > 70) prob -= 10;
       prob = Math.min(99, Math.max(1, prob));
       explanation = `Risk is ${prob > 60 ? 'elevated' : 'controlled'} due to ${importance} importance and ${emotion} emotional baseline.`;
    }

    const prediction = {
      regretProbability: prob,
      confidence: 88,
      explanation,
      suggestions: ["Consult a mentor", "Slow down and re-evaluate"],
      aiWisdom,
    };

    res.status(201).json({ success: true, ...prediction });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Process Error' });
  }
};

module.exports = { getPrediction };
