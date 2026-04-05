export const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/results", label: "Results" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export const services = [
  {
    slug: "google-business-profile",
    title: "Google Maps & GBP Optimization",
    hero: {
      title: "Show up stronger when nearby customers search.",
      subtitle:
        "We optimize your Google Business Profile so more people find you, trust what they see, and call your business.",
    },
    summary:
      "From categories and services to photos, posts, reviews, and service areas, we turn your profile into a better local lead source.",
    outcomes: [
      "Clearer Google Business Profile positioning",
      "Stronger local relevance for your core services",
      "Better trust signals before the click or call",
      "A repeatable review and profile update workflow",
    ],
    deliverables: [
      "GBP audit and local competitor review",
      "Category, service, and service-area cleanup",
      "Profile copy, photo, and posting plan",
      "Review request workflow and response guidance",
    ],
  },
  {
    slug: "local-seo",
    title: "Local SEO & Service-Area Pages",
    hero: {
      title: "Rank for the services and cities that matter most.",
      subtitle:
        "We build the local SEO foundation that helps your website earn more qualified calls, quote requests, and organic visibility.",
    },
    summary:
      "We map local search intent, tighten on-page signals, and build service and location pages around how your best customers actually search.",
    outcomes: [
      "Better service and city page coverage",
      "Stronger internal linking and local relevance",
      "Cleaner technical and on-page SEO foundations",
      "More qualified local search traffic",
    ],
    deliverables: [
      "Local keyword and competitor map",
      "Service and location page roadmap",
      "On-page SEO improvements",
      "Schema, internal linking, and content priorities",
    ],
  },
  {
    slug: "local-websites",
    title: "Websites & Landing Pages for Local Leads",
    hero: {
      title: "Turn local traffic into calls and quote requests.",
      subtitle:
        "We build or improve websites so they load fast, look trustworthy, and make it easy for local customers to contact you.",
    },
    summary:
      "If your site feels dated, thin, or unclear, we simplify the message, improve conversion paths, and build pages that support local SEO.",
    outcomes: [
      "Cleaner mobile experience for local visitors",
      "Clearer calls to action and quote flows",
      "Pages built for trust and local conversion",
      "A better handoff from Maps and Search to contact",
    ],
    deliverables: [
      "Messaging and page-structure improvements",
      "Homepage, service page, and contact page upgrades",
      "Mobile UX and conversion improvements",
      "Tracking setup and local trust elements",
    ],
  },
  {
    slug: "reviews-citations",
    title: "Reviews, Citations & Local Trust Signals",
    hero: {
      title: "Give Google and customers more reasons to trust you.",
      subtitle:
        "We strengthen the local trust layer around your business so rankings, click-throughs, and conversions have a better foundation.",
    },
    summary:
      "From review workflows to citation consistency and trust cues, we help local businesses clean up signals that influence visibility and conversion.",
    outcomes: [
      "More consistent business information across the web",
      "Better review acquisition habits",
      "Stronger trust signals for local searchers",
      "Less confusion across listings and directories",
    ],
    deliverables: [
      "Citation audit and cleanup plan",
      "Review request workflow",
      "Business-info consistency checklist",
      "Trust-signal and reputation roadmap",
    ],
  },
] as const;

export const stats = [
  { label: "From Maps, local SEO, and website fixes", value: "More calls" },
  { label: "From better city and service targeting", value: "Better leads" },
  { label: "From stronger reviews and trust signals", value: "Higher trust" },
  { label: "From a tighter local funnel", value: "Less wasted demand" },
];

export const caseStudies = [
  {
    title: "Service-area plumbing company",
    industry: "Home Services",
    summary:
      "Cleaned up the Google Business Profile, clarified service-area pages, and improved trust signals so nearby homeowners had a clearer path to call.",
    results: ["Stronger map visibility", "More estimate calls", "Better service-page coverage"],
  },
  {
    title: "Local accounting firm",
    industry: "Professional Services",
    summary:
      "Reworked local pages around tax and bookkeeping intent, tightened internal linking, and improved the contact path for high-intent searches.",
    results: ["Better local rankings", "Clearer lead flow", "Stronger organic intent capture"],
  },
  {
    title: "Roofing company with a weak web presence",
    industry: "Roofing",
    summary:
      "Built a leaner website structure, improved local trust cues, and aligned the site with the company’s Google Business Profile.",
    results: ["Cleaner conversion path", "Stronger local trust", "More coverage for priority services"],
  },
  {
    title: "Multi-location electrical contractor",
    industry: "Multi-location Services",
    summary:
      "Mapped the site and local profiles around each service area so the business could compete with more confidence across multiple cities.",
    results: ["Better local structure", "Stronger location targeting", "A clearer market-by-market growth plan"],
  },
];

export const testimonials = [
  {
    quote:
      "We do great work, but competitors keep showing up above us when people search in our city.",
    name: "Common contractor concern",
    role: "Before a local SEO cleanup",
  },
  {
    quote:
      "Our Google Business Profile gets views, but not enough calls. We are not sure what is missing.",
    name: "Common service-business concern",
    role: "Before a Maps optimization sprint",
  },
  {
    quote:
      "We have a website, but it does not feel like it is helping us win more local jobs.",
    name: "Common owner concern",
    role: "Before a conversion and local-page rebuild",
  },
];

export const faqs = [
  {
    question: "Can you help if I do not have a website yet?",
    answer:
      "Yes. We can start with your Google Business Profile and build a simple website or landing pages when that becomes the next bottleneck.",
  },
  {
    question: "What if I have a website but no Google Business Profile?",
    answer:
      "That is common. We can help you create, verify, and optimize your profile so you can compete in Maps as well as organic search.",
  },
  {
    question: "Do you work with service-area businesses and multi-location businesses?",
    answer:
      "Yes. We work with single-location businesses, service-area businesses, and companies that need a repeatable setup across multiple locations.",
  },
  {
    question: "What usually matters most first: Maps, website SEO, or reviews?",
    answer:
      "It depends on what is already in place. The audit is meant to show you the biggest local bottleneck before you spend time or money on the wrong fix.",
  },
  {
    question: "How do you measure progress?",
    answer:
      "We focus on local visibility, calls, quote requests, contact conversions, and whether the business is becoming easier to find and choose.",
  },
  {
    question: "Can you help if I am starting from scratch?",
    answer:
      "Yes. We can help set up the foundation if you do not yet have a website, a polished profile, or consistent local signals.",
  },
];

export const resourcePosts = [
  {
    title: "What to fix first if your Google Business Profile is not driving calls",
    label: "Google Maps",
    date: "March 18, 2026",
  },
  {
    title: "How local service pages should be structured to win better leads",
    label: "Local SEO",
    date: "February 27, 2026",
  },
  {
    title: "The trust signals that matter most for local service businesses",
    label: "Conversion",
    date: "January 31, 2026",
  },
];

export const values = [
  {
    title: "Clarity over complexity",
    description:
      "Local businesses do not need jargon. They need a clear picture of what is broken, what matters first, and what will help drive more calls.",
  },
  {
    title: "Local intent first",
    description:
      "We focus on how real customers search in your city or service area, then build pages, profiles, and trust signals around that intent.",
  },
  {
    title: "Practical momentum",
    description:
      "We prioritize the local changes that are easiest to act on and most likely to improve visibility, trust, and conversions.",
  },
];

export const careers: Array<{
  role: string;
  location: string;
  type: string;
}> = [];
