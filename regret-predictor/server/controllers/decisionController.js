const Decision = require('../models/Decision');
const mongoose = require('mongoose');

if (!global.memoryDecisions) global.memoryDecisions = [];

const getDecisions = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const decisions = await Decision.find({ userId: req.user._id }).sort({ createdAt: -1 });
      return res.json({ success: true, decisions });
    } else {
      const decisions = global.memoryDecisions
        .filter(d => d.userId.toString() === req.user._id.toString())
        .sort((a, b) => b.createdAt - a.createdAt);
      return res.json({ success: true, decisions });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetch failed' });
  }
};

const deleteDecision = async (req, res) => {
  try {
    const id = req.params.id;
    if (mongoose.connection.readyState === 1) {
      await Decision.findOneAndDelete({ _id: id, userId: req.user._id });
    } else {
      global.memoryDecisions = global.memoryDecisions.filter(d => d._id.toString() !== id);
    }
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
};

const getStats = async (req, res) => {
  res.json({ success: true, stats: { total: 0, highRegret: 0, avgRegretProbability: 0 } });
};

module.exports = { getDecisions, deleteDecision, getStats, getDecision: (req, res) => res.json({success: true}) };
