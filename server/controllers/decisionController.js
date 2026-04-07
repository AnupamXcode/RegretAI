const Decision = require('../models/Decision');
const mongoose = require('mongoose');

if (!global.memoryDecisions) global.memoryDecisions = [];

const getDecisions = async (req, res) => {
  try {
    const { importance, emotion, minRegret, maxRegret, search } = req.query;
    let filter = { userId: req.user._id };

    // Add filters
    if (importance) filter.importance = importance;
    if (emotion) filter.emotion = emotion;
    if (search) {
      filter.decisionTitle = { $regex: search, $options: 'i' };
    }

    if (mongoose.connection.readyState === 1) {
      let query = Decision.find(filter).sort({ createdAt: -1 });
      
      // Regret probability range filter
      let decisions = await query.exec();
      if (minRegret || maxRegret) {
        decisions = decisions.filter(d => {
          const regret = d.prediction?.regretProbability || 0;
          if (minRegret && regret < parseInt(minRegret)) return false;
          if (maxRegret && regret > parseInt(maxRegret)) return false;
          return true;
        });
      }
      return res.json({ success: true, decisions });
    } else {
      let decisions = global.memoryDecisions
        .filter(d => d.userId.toString() === req.user._id.toString())
        .sort((a, b) => b.createdAt - a.createdAt);
      
      // Apply in-memory filters
      if (importance) {
        decisions = decisions.filter(d => d.importance === importance);
      }
      if (emotion) {
        decisions = decisions.filter(d => d.emotion === emotion);
      }
      if (search) {
        decisions = decisions.filter(d => 
          d.decisionTitle.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (minRegret || maxRegret) {
        decisions = decisions.filter(d => {
          const regret = d.prediction?.regretProbability || 0;
          if (minRegret && regret < parseInt(minRegret)) return false;
          if (maxRegret && regret > parseInt(maxRegret)) return false;
          return true;
        });
      }
      
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
  try {
    let decisions;
    
    if (mongoose.connection.readyState === 1) {
      decisions = await Decision.find({ userId: req.user._id });
    } else {
      decisions = global.memoryDecisions.filter(d => 
        d.userId.toString() === req.user._id.toString()
      );
    }

    const total = decisions.length;
    const highRegret = decisions.filter(d => 
      (d.prediction?.regretProbability || 0) > 60
    ).length;
    const avgRegretProbability = decisions.length > 0
      ? Math.round(
          decisions.reduce((sum, d) => sum + (d.prediction?.regretProbability || 0), 0) / decisions.length
        )
      : 0;

    res.json({ 
      success: true, 
      stats: { 
        total, 
        highRegret, 
        avgRegretProbability,
        emotions: getEmotionCounts(decisions),
        importanceLevels: getImportanceCounts(decisions)
      } 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Stats failed' });
  }
};

const getEmotionCounts = (decisions) => {
  const counts = {};
  decisions.forEach(d => {
    counts[d.emotion] = (counts[d.emotion] || 0) + 1;
  });
  return counts;
};

const getImportanceCounts = (decisions) => {
  const counts = { low: 0, medium: 0, high: 0 };
  decisions.forEach(d => {
    counts[d.importance] = (counts[d.importance] || 0) + 1;
  });
  return counts;
};

module.exports = { getDecisions, deleteDecision, getStats, getDecision: (req, res) => res.json({success: true}) };
