// src/models/SeoSettings.js
const mongoose = require('mongoose');

const MetaSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    keywords: String,
    author: String,
    canonicalUrl: String,
  },
  { _id: false }
);

const OpenGraphSchema = new mongoose.Schema(
  {
    ogType: String, // will map to og:type
    title: String,
    description: String,
    image: String,
    url: String,
  },
  { _id: false }
);

const TwitterSchema = new mongoose.Schema(
  {
    card: String,
    title: String,
    description: String,
    image: String,
  },
  { _id: false }
);

const SeoSettingsSchema = new mongoose.Schema({
  meta: MetaSchema,
  openGraph: OpenGraphSchema,
  twitter: TwitterSchema,
  structuredData: String, // JSON-LD string
});

module.exports = mongoose.model('SeoSettings', SeoSettingsSchema);