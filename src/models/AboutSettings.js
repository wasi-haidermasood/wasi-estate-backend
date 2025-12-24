// src/models/AboutSettings.js
const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema(
  {
    value: String,
    label: String,
  },
  { _id: false }
);

const MilestoneSchema = new mongoose.Schema(
  {
    year: String,
    title: String,
    description: String,
  },
  { _id: false }
);

const ValueItemSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { _id: false }
);

const PartnershipImageSchema = new mongoose.Schema(
  {
    image: String,
    caption: String,
    location: String,
  },
  { _id: false }
);

const WhyChooseItemSchema = new mongoose.Schema(
  {
    title: String,
    desc: String,
  },
  { _id: false }
);

const AboutSettingsSchema = new mongoose.Schema({
  header: {
    badgeText: String,
    titleMain: String,
    titleHighlight: String,
    subtitle: String,
  },

  founder: {
    image: String,
    name: String,
    roleLine: String,
    sinceText: String,
    experienceText: String,
    partnersText: String,
    presidentBadgeText: String,
    highlightTitle: String,
    highlightText: String,
    messageTitle: String,
    messageParagraphs: [String],
  },

  achievements: [AchievementSchema],

  association: {
    badgeText: String,
    title: String,
    description: String,
    bulletPoints: [String],
  },

  mission: {
    title: String,
    text: String,
  },

  vision: {
    title: String,
    text: String,
  },

  milestones: [MilestoneSchema],
  values: [ValueItemSchema],

  partnership: {
    badgeText: String,
    title: String,
    subtitle: String,
    images: [PartnershipImageSchema],
  },

  whyChoose: {
    title: String,
    items: [WhyChooseItemSchema],
  },
});

module.exports = mongoose.model('AboutSettings', AboutSettingsSchema);