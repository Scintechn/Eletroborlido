/**
 * English content dictionary — the structural base for the site.
 *
 * Localization: this object's shape defines the `Dictionary` type. To add
 * Portuguese, create `pt.ts` exporting `const pt: Dictionary = { ... }` and
 * register it in `index.ts`. The compiler then guarantees full key parity.
 *
 * All user-facing strings live here; no copy should be hardcoded in components.
 */

export const en = {
  meta: {
    locale: "en",
    ogLocale: "en_GB",
    siteName: "Eletroborlido",
    titleTemplate: "%s | Eletroborlido",
    defaultTitle:
      "Eletroborlido — Electrical Installations & Smart Home in Viana do Castelo",
    defaultDescription:
      "Professional electrical installations, security & gate automation, EV charging station installation, home automation, and appliance sales/repair in Viana do Castelo (Santa Marta de Portuzelo). Reliable local service since 2018.",
    servicesTitle: "Services",
    contactTitle: "Contact",
  },

  nav: {
    home: "Home",
    services: "Services",
    contact: "Contact",
    requestQuote: "Request a Free Quote",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primaryLabel: "Primary navigation",
    mobileLabel: "Mobile navigation",
    skipToContent: "Skip to content",
    languageSwitcherLabel: "Choose language",
  },

  whatsapp: {
    label: "WhatsApp",
    ariaLabel: "Chat with us on WhatsApp (opens in a new tab)",
    prefill: "Hello! I'd like to request a free quote.",
  },

  home: {
    hero: {
      eyebrow: "Viana do Castelo · Since 2018",
      title:
        "Professional Electrical Installations, Security and EV Charging You Can Trust",
      subtitle:
        "Electrical installations, security systems, and EV charging stations — delivered by certified technicians with the rigour and reliability your home or business deserves.",
      primaryCta: "Request a Free Quote",
      secondaryCta: "Explore Services",
      trustNote: "Certified company. Quotes with no commitment.",
      badge: "Certified company since 2018",
      panel: {
        title: "Smart Home Control",
        status: "Online",
        rows: {
          lighting: "Lighting",
          climate: "Climate",
          security: "Security",
          gate: "Gate",
        },
      },
    },
    stats: {
      heading: "Trusted by homes and businesses across the Minho region",
      items: [
        { value: "8+", label: "Years of experience", dynamic: "yearsExperience" },
        { value: "500+", label: "Projects completed" },
        { value: "24h", label: "Response time" },
        { value: "100%", label: "Satisfaction focused" },
      ],
    },
    about: {
      eyebrow: "About Us",
      title: "Professional rigour since 2018 in Santa Marta de Portuzelo",
      paragraphs: [
        "Eletroborlido was founded in 2018 as a local, family-minded company serving Viana do Castelo and the wider Minho region. We pair certified technical work with honest, transparent advice.",
        "We combine two complementary activities: the commerce of professional electrical material and appliances, and specialised technical contracting — electrical installation, repairs, security hardware and automation.",
        "Every job is backed by qualified technicians, a written quote, and dedicated after-sales support. Reliability is not a slogan for us — it is how we keep our customers for years.",
      ],
      features: [
        "Certified and registered company",
        "Qualified, experienced technicians",
        "Warranty on every installation",
        "Dedicated after-sales support",
      ],
      foundedIn: "Founded in",
      cta: "Get in touch",
    },
    servicesSection: {
      eyebrow: "Our Services",
      title: "Complete solutions for your property",
      subtitle:
        "Whether you need a new installation, a smarter home, or a reliable repair — we cover the full lifecycle.",
      viewAll: "View all services",
      cardCta: "Learn more",
    },
    ctaBand: {
      title: "Ready to start your project?",
      subtitle:
        "Get in touch today and receive a free, no-commitment quote tailored to your needs.",
      button: "Request a Free Quote",
      phonePrefix: "Or call us:",
    },
  },

  services: {
    hero: {
      eyebrow: "Our Services",
      title: "Electrical, automation & appliance expertise — under one roof",
      subtitle:
        "Eletroborlido operates across two official areas of activity: the wholesale & retail commerce of electrical material and appliances, and specialised technical contracting.",
    },
    /** The 4 core offerings. `icon` keys map to lucide icons in the UI layer. */
    items: [
      {
        id: "electrical-installations",
        icon: "zap",
        title: "Electrical Installations",
        short: "Switchboards, wiring, single & three-phase, certifications.",
        description:
          "Complete electrical installations for homes, shops and industry — designed, executed and certified to current standards.",
        features: [
          "New installations & full rewiring",
          "Switchboards and single/three-phase circuits",
          "Electrical grid repairs & fault finding",
          "Inspections, upgrades and certifications",
        ],
      },
      {
        id: "security-gate-automation",
        icon: "shield",
        title: "Security Systems & Gate Automation",
        short: "Automatic gates, intercoms, alarms and CCTV.",
        description:
          "Protect what matters with professionally installed security hardware and reliable gate automation mechanics.",
        features: [
          "Automatic gates & garage door motors",
          "Video intercoms & access control",
          "Alarm systems & CCTV",
          "Maintenance and rapid repairs",
        ],
      },
      {
        id: "ev-charging",
        icon: "plug-zap",
        title: "EV Charging Stations",
        short:
          "Wallbox installation for any electric vehicle — every standard brand.",
        description:
          "Certified installation of EV charging points for homes, businesses and condominiums — every standard wallbox brand and connector.",
        features: [
          "Compatible with any electric vehicle",
          "Type 2 connector (European standard)",
          "Smart charging and app control",
          "Consumption study and certification",
        ],
      },
      {
        id: "home-automation",
        icon: "home",
        title: "Home Automation (Smart Home)",
        short: "Lighting, climate, blinds and scenes — controlled intelligently.",
        description:
          "Make your home or office smarter and more efficient with integrated automation for lighting, climate, blinds, energy and access.",
        features: [
          "Smart lighting & scene control",
          "Automated blinds, climate & energy management",
          "Voice and app-based control",
          "Integration with existing installations",
        ],
      },
      {
        id: "appliance-sales-repair",
        icon: "wrench",
        title: "Household Appliance Sales & Repair",
        short: "Sales of appliances plus on-site and workshop repairs.",
        description:
          "From buying the right appliance to keeping it running — we sell and repair household appliances with genuine parts.",
        features: [
          "Sales of household appliances",
          "On-site and workshop repairs",
          "Genuine spare parts & accessories",
          "Honest diagnostics & advice",
        ],
      },
    ],
    /** Featured spotlight section — the "special area" for EV charging. */
    spotlight: {
      eyebrow: "New Service",
      badge: "NEW",
      title: "EV Charging Station Installation",
      subtitle:
        "Charge your electric vehicle at home or at the office — we install and certify the right wallbox for you.",
      description:
        "Get a future-proof EV charging point installed by certified electricians. We work with every standard wallbox brand and connector, configure smart charging features, and handle the full installation — from the consumption study to the final certification.",
      features: [
        "All standard wallbox brands and models",
        "Type 2 connector — the European standard for EVs",
        "Smart charging, app control and load management",
        "IP65 outdoor-rated installation when needed",
        "Consumption study, certification and after-sales support",
      ],
      connectorsLabel: "Compatible with",
      connectors: ["Any EV brand", "Type 2", "Single & three-phase", "Indoor / outdoor"],
      panel: {
        status: "Charging",
        chargingLabel: "Charging session",
        powerLabel: "Power",
        progressLabel: "Battery",
      },
      whatsappCta: "Talk to us on WhatsApp",
      whatsappPrefill:
        "Hello! I'd like to know more about installing an EV charging station.",
      footnote: "Free quote · Certified installation · After-sales support",
    },

    /** Scope framed around official CAE classifications. */
    scope: {
      eyebrow: "Our Scope of Activity",
      title: "Commerce and technical contracting, working together",
      subtitle:
        "Our official areas of activity let us both supply the right materials and carry out the work.",
      areas: [
        {
          icon: "store",
          title: "Wholesale & Retail Commerce",
          description:
            "Distribution and retail of professional electrical components, specialised hardware, tools, plumbing & heating equipment accessories, and household appliances.",
          tags: [
            "Electrical components",
            "Specialised hardware & tools",
            "Plumbing & heating accessories",
            "Household appliances",
          ],
        },
        {
          icon: "hard-hat",
          title: "Technical Contracting",
          description:
            "Specialised local services in technical electrical installation, electrical grid repairs, safety & security hardware systems, and automation mechanics.",
          tags: [
            "Technical electrical installation",
            "Electrical grid repairs",
            "Security hardware systems",
            "Automation mechanics",
          ],
        },
      ],
    },
    cta: {
      title: "Not sure which service you need?",
      subtitle:
        "Tell us about your project and we'll recommend the right approach — with a free quote.",
      button: "Request a Free Quote",
    },
  },

  contact: {
    hero: {
      eyebrow: "Contact",
      title: "Let's talk about your project",
      subtitle:
        "Reach out for a free quote, a technical question, or to visit our showroom in Santa Marta de Portuzelo.",
    },
    form: {
      heading: "Send us a message",
      name: { label: "Full name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "you@example.com" },
      phone: { label: "Phone", placeholder: "Optional", optional: "Optional" },
      subject: {
        label: "Subject",
        placeholder: "Select a topic",
        // Order mirrors the services list in `services.items` so the form
        // matches what visitors saw on the services page.
        options: [
          { value: "electrical", label: "Electrical Installations" },
          { value: "security", label: "Security Systems & Gate Automation" },
          { value: "ev_charging", label: "EV Charging" },
          { value: "automation", label: "Home Automation & Smart Home" },
          { value: "appliances", label: "Appliance Sales & Repair" },
          { value: "other", label: "Other" },
        ],
      },
      message: {
        label: "Message",
        placeholder: "Tell us a bit about what you need…",
      },
      consent: {
        before: "I accept the ",
        link: "Privacy Policy",
        after: ".",
      },
      submit: "Send Request",
      submitting: "Sending…",
      success: {
        title: "Message sent!",
        body: "Thank you for reaching out. We'll get back to you shortly.",
        again: "Send another message",
      },
      errors: {
        name: "Please enter your name.",
        email: "Please enter a valid email address.",
        message: "Please enter a message (at least 10 characters).",
        consent: "Please accept the Privacy Policy to continue.",
        submit:
          "Something went wrong while sending. Please try again or call us directly.",
      },
    },
    info: {
      heading: "Contact details",
      phoneLabel: "Phone",
      landlineLabel: "Landline",
      mobileLabel: "Mobile",
      emailLabel: "Email",
      showroomLabel: "Showroom & Shop",
      officeLabel: "Registered office",
      directions: "Get directions",
    },
    hours: {
      heading: "Opening hours",
      weekdays: "Monday – Friday",
      morning: "Morning",
      afternoon: "Afternoon",
      saturday: "Saturday",
      sunday: "Sunday",
      closed: "Closed",
      note: "Closed on public holidays.",
    },
    map: {
      heading: "Find us",
      caption: "Showroom — Santa Marta de Portuzelo",
      title: "Map showing the Eletroborlido showroom location",
    },
  },

  footer: {
    tagline:
      "Electrical installations, security systems and EV charging in Viana do Castelo.",
    legalHeading: "Company details",
    legalNameLabel: "Legal name",
    nifLabel: "NIF / NIPC",
    showroomLabel: "Showroom",
    quickLinksHeading: "Navigate",
    legalLinksHeading: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    disputeResolution: "Online Dispute Resolution",
    disputeResolutionAria: "Online Dispute Resolution (opens in a new tab)",
    contactHeading: "Contact",
    livroReclamacoes: "Electronic Complaints Book",
    livroReclamacoesAria:
      "Livro de Reclamações Eletrónico (opens in a new tab)",
    hoursSummary: "Mon–Fri: 09:00–12:30 · 14:30–19:00",
    rights: "All rights reserved.",
  },

  legal: {
    privacy: {
      title: "Privacy Policy",
      updated: "Last updated",
      placeholderDate: "[date]",
      intro:
        "This Privacy Policy explains how Eletroborlido, Unipessoal Lda. collects, uses and protects your personal data. This is a placeholder to be reviewed by legal counsel before publication.",
      sections: [
        {
          heading: "1. Data controller",
          body: "Eletroborlido, Unipessoal Lda. is the entity responsible for processing personal data collected through this website.",
        },
        {
          heading: "2. Data we collect",
          body: "We collect the information you provide via our contact form (name, email, phone and message) for the sole purpose of responding to your request.",
        },
        {
          heading: "3. Legal basis & purpose",
          body: "Data is processed on the basis of your consent and our legitimate interest in answering enquiries. We do not sell your data to third parties.",
        },
        {
          heading: "4. Data retention",
          body: "We retain enquiry data only for as long as necessary to handle your request and comply with legal obligations.",
        },
        {
          heading: "5. Your rights",
          body: "Under the GDPR you may request access, rectification, erasure, restriction or portability of your data. Contact us using the details below.",
        },
        {
          heading: "6. Contact",
          body: "For any privacy-related request, please contact us at the email or address listed in the footer.",
        },
      ],
    },
    terms: {
      title: "Terms & Conditions",
      updated: "Last updated",
      placeholderDate: "[date]",
      intro:
        "These Terms & Conditions govern the use of this website and the services provided by Eletroborlido, Unipessoal Lda. This is a placeholder to be reviewed by legal counsel before publication.",
      sections: [
        {
          heading: "1. General",
          body: "By accessing this website you agree to these terms. The content is provided for information purposes and may be updated at any time.",
        },
        {
          heading: "2. Services & quotes",
          body: "Quotes provided are free and non-binding until formally accepted in writing by both parties. Service scope, price and timelines are confirmed per project.",
        },
        {
          heading: "3. Warranties",
          body: "Installation work is covered by warranty in accordance with applicable Portuguese consumer law.",
        },
        {
          heading: "4. Liability",
          body: "We are not liable for indirect damages arising from misuse of information on this website.",
        },
        {
          heading: "5. Consumer disputes",
          body: "Consumers may resort to the Electronic Complaints Book and the dispute-resolution entities linked in the footer.",
        },
        {
          heading: "6. Governing law",
          body: "These terms are governed by Portuguese law, with jurisdiction in the courts of Viana do Castelo.",
        },
      ],
    },
  },
};
