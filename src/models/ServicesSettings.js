// src/models/ServicesSettings.js
const mongoose = require('mongoose');

const BeforeAfterProjectSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    type: String,
    beforeImage: String,
    afterImage: String,
    duration: String,
    budget: String,
  },
  { _id: false }
);

const TransformationsHeaderSchema = new mongoose.Schema(
  {
    badgeText: String,
    title: String,
    subtitle: String,
  },
  { _id: false }
);

const TransformationsSchema = new mongoose.Schema(
  {
    enabled: { type: Boolean, default: true },
    header: TransformationsHeaderSchema,
    projects: [BeforeAfterProjectSchema],
  },
  { _id: false }
);

const ServicesSettingsSchema = new mongoose.Schema({
  transformations: TransformationsSchema,
});

module.exports = mongoose.model('ServicesSettings', ServicesSettingsSchema);