// src/data/navigation.js

const NAVIGATION_CONFIG = {
  logo: {
    name: "WASI ESTATE ",
    tagline: "Premium Properties",
    logoIcon: "Building2",         // Lucide icon key
    logoImage: "",                 // Optional: set to logo URL if you have one
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
      { icon: "Whatsapp", href: "https://wa.me/923214710692", label: "WhatsApp" },
      { icon: "LinkedIn", href: "#", label: "LinkedIn" },
    ],
  },

  desktopActions: {
    callLabel: "0321-4710692",
    callHref: "tel:03214710692",
    ctaLabel: "List Property",
    // should be a hash of a section id, since we use scrollToSection
    ctaHref: "#contact",
  },

  mobileActions: {
    callHref: "tel:03214710692",
    whatsappHref: "https://wa.me/923214710692",
  },

  navItems: [
    {
      name: "Home",
      href: "#home",
      hasDropdown: false,
    },
    {
      name: "Buy",
      href: "#properties",
      hasDropdown: true,
      megaMenu: [
        {
          // Menu section
          title: "Property Types",
          items: [
            {
              name: "Houses & Villas",
              href: "#houses",
              icon: "Home",
              desc: "Luxury family homes",
            },
            {
              name: "Apartments",
              href: "#apartments",
              icon: "Building2",
              desc: "Modern living spaces",
            },
            {
              name: "Commercial",
              href: "#commercial",
              icon: "Briefcase",
              desc: "Office & retail",
            },
            {
              name: "Plots & Land",
              href: "#plots",
              icon: "MapPin",
              desc: "Investment plots",
            },
          ],
        },
        {
          title: "Top Locations",
          items: [
            { name: "DHA Lahore", href: "#dha" },
            { name: "Bahria Town", href: "#bahria" },
            { name: "Gulberg", href: "#gulberg" },
            { name: "Model Town", href: "#model-town" },
          ],
        },
        {
          // Highlight section
          isHighlight: true,
          title: "Featured Project",
          image:
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          titleText: "Smart City Apartments",
          price: "Starting 85 Lac",
        },
      ],
    },
    {
      name: "Rent",
      href: "#rent",
      hasDropdown: true,
      megaMenu: [
        {
          title: "Rental Options",
          items: [
            {
              name: "Houses for Rent",
              href: "#rent-house",
              icon: "Key",
              desc: "Family homes",
            },
            {
              name: "Apartments for Rent",
              href: "#rent-flat",
              icon: "Building2",
              desc: "1-4 bed units",
            },
            {
              name: "Office Spaces",
              href: "#rent-office",
              icon: "Briefcase",
              desc: "Commercial rental",
            },
          ],
        },
        {
          title: "Rental Services",
          items: [
            { name: "Property Management", href: "#management" },
            { name: "Tenant Screening", href: "#screening" },
            { name: "Lease Agreements", href: "#lease" },
          ],
        },
      ],
    },
    {
      name: "Services",
      href: "#services",
      hasDropdown: true,
      megaMenu: [
        {
          title: "Our Services",
          items: [
            { name: "Property Valuation", href: "#valuation", icon: "Building2" },
            { name: "Home Construction", href: "#construction", icon: "Hammer" },
            { name: "Interior Design", href: "#interior", icon: "Home" },
            { name: "Legal Consultation", href: "#legal", icon: "Briefcase" },
          ],
        },
      ],
    },
    {
      name: "About",
      href: "#about",
      hasDropdown: false,
    },
    {
      name: "Contact",
      href: "#contact",
      hasDropdown: false,
    },
  ],
};

module.exports = { NAVIGATION_CONFIG };