// src/data/hero.js

const HERO_SETTINGS = {
  slides: [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Premium Commercial Spaces",
      subtitle: "Expand your business in the heart of the city",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Exclusive Residential Estates",
      subtitle: "Living redefined with world-class amenities",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "Investment Opportunities",
      subtitle: "Secure high ROI with our verified projects",
    },
  ],

  // "Since 2013 • Trusted Partner" badge
  trustBadge: {
    text: "Since 2007 • Trusted Partner",
    bgColor: "rgba(234,179,8,0.2)",     // yellow-ish background
    borderColor: "rgba(234,179,8,0.4)", // yellow-ish border
    textColor: "#f7f7f7ff",               // yellow text
    dotColor: "#facc15",                // pulsing dot color
  },

  header: {
    subtitleSuffix: "We connect you with the most prestigious properties.",
  },

  headerButtons: {
    viewListingsText: "View Listings",
    watchVideoText: "Watch Video",
    // Put your promo / intro video link here (YouTube, etc.)
    watchVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },

  ctaCard: {
    title: "Buy or Sell Property?",
    subtitle: "Free consultation available",
    highlightText: "2% ONLY",

    primaryButtonText: "Request Call Back",

    whatsappNumber: "923214710692",
    whatsappText: "WhatsApp",

    secondaryButtonText: "List Property",

    agentsCount: 12,
    agentsLabel: "Agents",
    verifyLabel: "Verified",
  },
};

module.exports = { HERO_SETTINGS };