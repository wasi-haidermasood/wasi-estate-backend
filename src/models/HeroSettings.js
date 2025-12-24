// src/models/HeroSettings.js
const mongoose = require('mongoose');

const HeroSlideSchema = new mongoose.Schema(
  {
    id: Number,          // 1, 2, 3...
    image: String,
    title: String,
    subtitle: String,
  },
  { _id: false }
);

const HeroSettingsSchema = new mongoose.Schema({
  slides: [HeroSlideSchema],

  trustBadge: {
    text: String,
    bgColor: String,
    borderColor: String,
    textColor: String,
    dotColor: String,
  },

  header: {
    subtitleSuffix: String,
  },

  headerButtons: {
    viewListingsText: String,
    watchVideoText: String,
    watchVideoUrl: String,
  },

  ctaCard: {
    title: String,
    subtitle: String,
    highlightText: String,
    primaryButtonText: String,

    whatsappNumber: String,
    whatsappText: String,

    secondaryButtonText: String,

    agentsCount: Number,
    agentsLabel: String,
    verifyLabel: String,
  },
});

module.exports = mongoose.model('HeroSettings', HeroSettingsSchema);