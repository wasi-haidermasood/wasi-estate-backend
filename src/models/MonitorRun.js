// models/MonitorRun.js
const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema(
  {
    type: String, // e.g. BROKEN_LINK, SLOW_PAGE, ...
    severity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'low',
    },
    pageUrl: String,
    details: mongoose.Schema.Types.Mixed,
  },
  { _id: false }
);

const MonitorRunSchema = new mongoose.Schema(
  {
    websiteUrl: String,
    startedAt: Date,
    finishedAt: Date,
    stats: {
      totalPages: Number,
      brokenLinks: Number,
      slowPages: Number,
      missingMetaTitle: Number,
      missingMetaDescription: Number,
      duplicateTitles: Number,
      duplicateContentGroups: Number,
      largeImages: Number,
      imagesMissingAlt: Number,
      averageResponseTimeMs: Number,
    },
    issues: [IssueSchema],
    aiSummary: {
      model: String,
      createdAt: Date,
      content: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MonitorRun', MonitorRunSchema);