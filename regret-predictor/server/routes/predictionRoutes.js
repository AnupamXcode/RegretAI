const express = require('express');
const router = express.Router();
const { getPrediction } = require('../controllers/predictionController');
const { protect } = require('../middleware/auth');

// POST /api/predict (protected)
router.post('/', protect, getPrediction);

module.exports = router;
