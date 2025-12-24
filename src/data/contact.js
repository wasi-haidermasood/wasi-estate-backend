// src/data/contact.js

const CONTACT_CONFIG = {
  header: {
    badgeText: "Get In Touch",
    title: "Contact Us",
    subtitle:
      "Ready to find your perfect property? Get in touch with our expert team today.",
  },

  phoneNumbers: [
    {
      icon: "Phone",
      label: "Primary Contact",
      number: "0321-4710692",
      href: "tel:03214710692",
    },
    {
      icon: "Phone",
      label: "Secondary Contact",
      number: "0300-4710692",
      href: "tel:03004710692",
    },
    {
      icon: "Headphones",
      label: "Marketing Team",
      number: "0328-5154250",
      href: "tel:03285154250",
    },
  ],

  office: {
    title: "Our Office",
    addressLines: [
      "HC34+583, Ahmad Hassan Rd,",
      "Mian Amiruddin Park,",
      "Lahore, Pakistan",
    ],
    mapsSearchUrl:
      "https://www.google.com/maps/search/?api=1&query=HC34%2B583%2C+Ahmad+Hassan+Rd%2C+Mian+Amiruddin+Park+Lahore",
  },

  businessHours: {
    rows: [
      {
        label: "Monday - Saturday",
        value: "9:00 AM - 8:00 PM",
      },
      {
        label: "Sunday",
        value: "10:00 AM - 6:00 PM",
      },
    ],
  },

  benefits: [
    "Free Property Consultation",
    "Only 1% Commission",
    "200+ Dealer Network",
    "Quick Response Time",
  ],

  map: {
    title: "Visit Our Office",
    subtitle: "HC34+583, Ahmad Hassan Rd, Mian Amiruddin Park, Lahore",
    mapsSearchUrl:
      "https://www.google.com/maps/search/?api=1&query=HC34%2B583%2C+Ahmad+Hassan+Rd%2C+Mian+Amiruddin+Park+Lahore",
    // This is your current iframe src, can be replaced by owner later
    embedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.5!2d74.2833!3d31.5167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904e6c3b9c5e9%3A0x1c8d33e8c9f5b1a2!2sAhmad%20Hassan%20Rd%2C%20Mian%20Amiruddin%20Park%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1699999999999!5m2!1sen!2s",
  },

  bottomCta: {
    title: "Need Immediate Assistance?",
    subtitle:
      "Our team is available to help you find your perfect property",
    primaryPhoneLabel: "Call: 0321-4710692",
    primaryPhoneHref: "tel:03214710692",
    whatsappLabel: "WhatsApp Us",
    whatsappHref: "https://wa.me/923214710692",
  },
};

module.exports = { CONTACT_CONFIG };