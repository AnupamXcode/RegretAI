const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

// Initialize global stores for in-memory fallback
global.memoryUsers = [];
global.memoryDecisions = [];
global.memoryAuthBypass = true;

const authRoutes = require('./routes/authRoutes');
const predictionRoutes = require('./routes/predictionRoutes');
const decisionRoutes = require('./routes/decisionRoutes');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/predict', predictionRoutes);
app.use('/api/decisions', decisionRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch((err) => {
    console.warn('⚠️ MongoDB connection failed. Running in IN-MEMORY mode for demo.');
  });

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
