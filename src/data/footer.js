// src/data/footer.js

const FOOTER_CONFIG = {
  company: {
    name: "Wasi Estate",
    tagline: "Advisers & Builders adviseer",
    description:
      "Lahore's trusted real estate partner since 2008. Transparent dealings with only 1% commission.",
    // If you set logoImage to non-empty URL, frontend will show that image instead of icon
    logoImage: "",
    logoAlt: "Wasi Estate logo",
    logoIcon: "Building2",
    presidentBadgeText:
      "President - Al-Faisal Town Property Dealers Association",
  },

  services: [
    { name: "Property Sale", href: "#services", icon: "Home" },
    { name: "Property Purchase", href: "#services", icon: "Key" },
    { name: "Rental Services", href: "#services", icon: "Building2" },
    { name: "Construction", href: "#services", icon: "Hammer" },
    { name: "Renovation", href: "#services", icon: "Hammer" },
    { name: "Documentation", href: "#services", icon: "FileText" },
  ],

  companyLinks: [
    { name: "About Us", href: "#about" },
    { name: "Our Portfolio", href: "#portfolio" },
    { name: "Services", href: "#services" },
    { name: "Contact Us", href: "#contact" },
    { name: "Free Consultation", href: "#contact" },
  ],

  areas: [
    "Al-Faisal Town",
    "DHA Lahore",
    "Bahria Town",
    "Gulberg",
    "Model Town",
    "Johar Town",
  ],

  socialLinks: [
    {
      icon: "Facebook",
      href: "https://facebook.com/wasiestate",
      label: "Facebook",
      color: "hover:bg-blue-600",
    },
    {
      icon: "Instagram",
      href: "https://instagram.com/wasiestate",
      label: "Instagram",
      color: "hover:bg-pink-600",
    },
    {
      icon: "Youtube",
      href: "https://youtube.com/@wasiestate",
      label: "YouTube",
      color: "hover:bg-red-600",
    },
    {
      icon: "MessageSquare",
      href: "https://wa.me/923214710692",
      label: "WhatsApp",
      color: "hover:bg-green-600",
    },
  ],

  contactInfo: [
    { icon: "Phone", text: "0321-4710692", href: "tel:03214710692" },
    { icon: "Phone", text: "0300-4710692", href: "tel:03004710692" },
    {
      icon: "Phone",
      text: "0328-5154250",
      href: "tel:03285154250",
      label: "Marketing",
    },
    {
      icon: "MapPin",
      text: "HC34+583, Ahmad Hassan Rd, Mian Amiruddin Park, Lahore",
      href: "#",
    },
  ],

  cta: {
    title: "Need Help?",
    subtitle: "Get free property consultation",
    buttonLabel: "WhatsApp Us",
    buttonHref: "https://wa.me/923214710692",
    buttonIcon: "MessageSquare",
  },

  stats: [
    { value: "17+", label: "Years Experience" },
    { value: "500+", label: "Properties Sold" },
    { value: "200+", label: "Partner Dealers" },
    { value: "1%", label: "Commission Only" },
  ],

  bottomBar: {
    privacyText: "Privacy Policy",
    privacyHref: "#",
    termsText: "Terms of Service",
    termsHref: "#",
    copyrightText:
      "Wasi Estate Advisers & Builders. All rights reserved.",
  },
};

module.exports = { FOOTER_CONFIG };