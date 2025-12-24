// src/models/ContactSettings.js
const mongoose = require('mongoose');

const PhoneNumberSchema = new mongoose.Schema(
  {
    icon: String,   // "Phone" | "Headphones", etc.
    label: String,
    number: String,
    href: String,
  },
  { _id: false }
);

const BusinessHourRowSchema = new mongoose.Schema(
  {
    label: String,
    value: String,
  },
  { _id: false }
);

const ContactSettingsSchema = new mongoose.Schema({
  header: {
    badgeText: String,
    title: String,
    subtitle: String,
  },

  phoneNumbers: [PhoneNumberSchema],

  office: {
    title: String,
    addressLines: [String],
    mapsSearchUrl: String,
  },

  businessHours: {
    rows: [BusinessHourRowSchema],
  },

  benefits: [String],

  map: {
    title: String,
    subtitle: String,
    mapsSearchUrl: String,
    embedSrc: String,
  },

  bottomCta: {
    title: String,
    subtitle: String,
    primaryPhoneLabel: String,
    primaryPhoneHref: String,
    whatsappLabel: String,
    whatsappHref: String,
  },
});

module.exports = mongoose.model('ContactSettings', ContactSettingsSchema);