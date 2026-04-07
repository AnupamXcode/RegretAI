const express = require('express');
const router = express.Router();
const { getDecisions, getDecision, deleteDecision, getStats } = require('../controllers/decisionController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/stats', getStats);
router.get('/', getDecisions);
router.get('/:id', getDecision);
router.delete('/:id', deleteDecision);

module.exports = router;
