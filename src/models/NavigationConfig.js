// src/models/NavigationConfig.js
const mongoose = require('mongoose');

const NavLinkSchema = new mongoose.Schema(
  {
    name: String,
    href: String,
    icon: String, // icon name like "Home", "Building2", etc.
    desc: String,
  },
  { _id: false }
);

const MegaMenuItemSchema = new mongoose.Schema(
  {
    // common fields
    title: String,      // section title OR highlight title label
    isHighlight: Boolean,

    // For highlight section
    image: String,
    titleText: String,
    price: String,

    // For normal section
    items: [NavLinkSchema],
  },
  { _id: false }
);

const NavItemSchema = new mongoose.Schema(
  {
    name: String,
    href: String,
    hasDropdown: Boolean,
    megaMenu: [MegaMenuItemSchema],
  },
  { _id: false }
);

const NavigationConfigSchema = new mongoose.Schema({
  logo: {
    name: String,
    tagline: String,
    logoIcon: String,
    logoImage: String,
    logoAlt: String,
  },
  topBar: {
    phoneLabel: String,
    phoneHref: String,
    email: String,
    emailHref: String,
    location: String,
    socialLinks: [
      {
        icon: String, // e.g. "Facebook", "Instagram"
        href: String,
        label: String,
      },
    ],
  },
  desktopActions: {
    callLabel: String,
    callHref: String,
    ctaLabel: String,
    ctaHref: String,
  },
  mobileActions: {
    callHref: String,
    whatsappHref: String,
  },
  navItems: [NavItemSchema],
});

module.exports = mongoose.model('NavigationConfig', NavigationConfigSchema);