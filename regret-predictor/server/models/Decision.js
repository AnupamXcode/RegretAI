const mongoose = require('mongoose');

const decisionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    decisionTitle: {
      type: String,
      required: [true, 'Decision title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    options: [
      {
        type: String,
        trim: true,
      },
    ],
    importance: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    timeHorizon: {
      type: String,
      enum: ['short-term', 'long-term'],
      required: true,
    },
    riskTolerance: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    emotion: {
      type: String,
      enum: ['happy', 'sad', 'angry', 'neutral', 'confused'],
      required: true,
    },
    emotionScore: {
      type: Number,
      required: true,
    },
    uncertainty: {
      type: Number,
      min: 0,
      max: 100,
      required: true,
    },
    prediction: {
      regretProbability: { type: Number },
      confidence: { type: Number },
      explanation: { type: String },
      suggestions: [{ type: String }],
      topFactors: [
        {
          factor: String,
          impact: Number,
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Decision', decisionSchema);
