// src/models/FooterSettings.js
const mongoose = require('mongoose');

const ServiceLinkSchema = new mongoose.Schema(
  {
    name: String,
    href: String,
    icon: String, // icon name: "Home", "Hammer", etc.
  },
  { _id: false }
);

const CompanyLinkSchema = new mongoose.Schema(
  {
    name: String,
    href: String,
  },
  { _id: false }
);

const SocialLinkSchema = new mongoose.Schema(
  {
    icon: String,  // "Facebook", "Instagram", ...
    href: String,
    label: String,
    color: String,
  },
  { _id: false }
);

const ContactInfoSchema = new mongoose.Schema(
  {
    icon: String,  // "Phone", "MapPin", ...
    text: String,
    href: String,
    label: String,
  },
  { _id: false }
);

const StatSchema = new mongoose.Schema(
  {
    value: String,
    label: String,
  },
  { _id: false }
);

const FooterSettingsSchema = new mongoose.Schema({
  company: {
    name: String,
    tagline: String,
    description: String,
    logoImage: String,
    logoAlt: String,
    logoIcon: String,
    presidentBadgeText: String,
  },

  services: [ServiceLinkSchema],

  companyLinks: [CompanyLinkSchema],

  areas: [String],

  socialLinks: [SocialLinkSchema],

  contactInfo: [ContactInfoSchema],

  cta: {
    title: String,
    subtitle: String,
    buttonLabel: String,
    buttonHref: String,
    buttonIcon: String,
  },

  stats: [StatSchema],

  bottomBar: {
    privacyText: String,
    privacyHref: String,
    termsText: String,
    termsHref: String,
    copyrightText: String,
  },
});

module.exports = mongoose.model('FooterSettings', FooterSettingsSchema);