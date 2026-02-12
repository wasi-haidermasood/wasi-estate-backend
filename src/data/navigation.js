// src/data/navigation.js

const NAVIGATION_CONFIG = {
  logo: {
    name: "WASI ESTATE",
    tagline: "Premium Properties",
    logoIcon: "Building2",      // Lucide icon key; you can change from Admin
    logoImage: "",              // Optional: put your logo URL here
    logoAlt: "Wasi Estate logo",
  },

  topBar: {
    phoneLabel: "0321-4710692",
    phoneHref: "tel:03214710692",
    email: "info@wasiestate.com",
    emailHref: "mailto:info@wasiestate.com",
    location: "Lahore, Pakistan",
    socialLinks: [
      { icon: "Facebook", href: "#", label: "Facebook" },
      { icon: "Instagram", href: "#", label: "Instagram" },
      { icon: "YouTube", href: "#", label: "YouTube" },
      {
        icon: "Whatsapp",
        href: "https://wa.me/923214710692",
        label: "WhatsApp",
      },
      { icon: "LinkedIn", href: "#", label: "LinkedIn" },
    ],
  },

  desktopActions: {
    callLabel: "0321-4710692",
    callHref: "tel:03214710692",
    ctaLabel: "List Property",
    // This matches the Contact section id on your homepage
    ctaHref: "#contact",
  },

  mobileActions: {
    callHref: "tel:03214710692",
    whatsappHref: "https://wa.me/923214710692",
  },

  // Simple main navigation items
  navItems: [
    {
      name: "Home",
      href: "#home",       // Scroll to <section id="home"> on Index.tsx
      hasDropdown: false,
    },
    {
      name: "Properties",
      href: "/properties", // Go to /properties page
      hasDropdown: false,
    },
    {
      name: "Services",
      href: "#services",   // Scroll to <section id="services">
      hasDropdown: false,
    },
    {
      name: "About",
      href: "#about",      // Scroll to <section id="about">
      hasDropdown: false,
    },
    {
      name: "Blog",
      href: "/blog",       // Go to /blog page
      hasDropdown: false,
    },
    {
      name: "Contact",
      href: "#contact",    // Scroll to <section id="contact">
      hasDropdown: false,
    },
  ],
};

module.exports = { NAVIGATION_CONFIG };