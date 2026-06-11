export const SITE_NAME = "Imaginary Space";
export const SITE_TAGLINE = "Adopt AI the right way.";
export const HERO_HEADLINE_LINES = [
  "Adopt AI the right way.",
  "Elite team. Elite product.",
] as const;
export const HERO_HEADLINE = HERO_HEADLINE_LINES.join(" ");
export const HERO_SUBTITLE =
  "Custom operations layers, internal apps, data pipelines, and AI agents built around how your company works. For venture-backed and enterprise teams.";
export const HERO_CLIENTS_EYEBROW =
  "Trusted by venture-backed companies and global enterprises:";
export const SITE_URL = "https://imaginaryspace.io";
export const CONTACT_EMAIL = "carlos@imaginaryspace.ai";
export const CONTACT_LOCATION = "San Francisco, CA";
export const CONTACT_REACH = "Working globally";

export const SEO = {
  defaultTitle: "Imaginary Space | AI Adoption Partner",
  defaultDescription:
    "Help companies adopt AI the right way. Elite team for venture-backed and enterprise operators. Custom operations layers, internal apps, and AI agents built around your workflows.",
  servicesDescription:
    "Enterprise AI adoption from discovery to daily use. Identify what to build, develop production systems, and embed AI in how your teams work. One senior team throughout.",
  teamDescription:
    "Elite team. Elite product. Meet the senior engineers behind Imaginary Space. 50+ production systems for venture-backed and enterprise clients.",
  contactDescription:
    "Looking for the right AI adoption partner? Tell us about your company. We respond within one business day.",
} as const;

export const FOOTER_LINKS = [
  {
    href: "https://www.imaginaryspace.ai/terms-of-service",
    label: "Terms",
    external: true,
  },
  {
    href: "https://www.imaginaryspace.ai/privacy-notice",
    label: "Privacy",
    external: true,
  },
  {
    href: "https://www.linkedin.com/company/imaginary-space/",
    label: "LinkedIn",
    external: true,
  },
  { href: "/work-with-us", label: "Contact" },
  {
    href: "https://www.imaginaryspace.ai",
    label: "imaginaryspace.ai",
    external: true,
  },
] as const;

export const STORY_PARAGRAPHS = [
  "Most teams buy AI tools. Few change how the company works.",
  "We build what fits your workflows: internal apps, data pipelines, and AI agents.",
  "Venture firms need portfolio adoption. Enterprises need a partner who stays.",
  "Elite team. Elite product. The partner who stays until it works.",
] as const;

/** Value block: headline first, then copy + CTA below */
export const SCROLL_VALUE_BLOCK = {
  headline: "Adopt AI the right way.",
  paragraphs: [
    "Not one feature. A personalized operations layer that changes how teams work, think, and use AI every day.",
    "Same senior team from first conversation through adoption. No outsourcing. No handoff.",
  ],
  ctaLabel: "get in touch",
  ctaHref: "/work-with-us",
} as const;

/** @deprecated Use SCROLL_VALUE_BLOCK */
export const VALUE_PROPOSITION = {
  headline: SCROLL_VALUE_BLOCK.headline,
  paragraphs: [...SCROLL_VALUE_BLOCK.paragraphs],
} as const;

export const SERVICES_HERO = {
  titleLead: "Adopt AI the right way.",
  titleAccent: "Built for your workflows.",
  subtitle:
    "Custom operations layers for venture portfolios and enterprise teams. Internal apps, data pipelines, and AI agents designed around what slows you down.",
} as const;

export type ServicePhase = {
  id: "identify" | "develop" | "adopt";
  number: string;
  navLabel: string;
  title: string;
  subtitle: string;
  description: string | readonly string[];
  whatWeDo: readonly { title: string; description: string }[];
};

export const SERVICES_PHASES: readonly ServicePhase[] = [
  {
    id: "identify",
    number: "1",
    navLabel: "1. Identify",
    title: "Identify",
    subtitle: "Find what will change how the company works",
    description:
      "We study how work actually happens: where time goes, where decisions stall, and what manual effort repeats. Then we narrow to the AI opportunities that will improve how teams operate day to day. You leave with a clear roadmap, not a slide deck.",
    whatWeDo: [
      {
        title: "Leadership Alignment",
        description:
          "Align partners, executives, and operators on priorities, constraints, and what good adoption looks like.",
      },
      {
        title: "Workflow Discovery",
        description:
          "Talk to the people doing the work. Map bottlenecks, data gaps, and where AI can fit naturally.",
      },
      {
        title: "Business Case Design",
        description:
          "Pressure-test ideas before capital is committed. Focus on what is worth building.",
      },
      {
        title: "Prioritization",
        description:
          "Rank opportunities by impact and fit. Everyone knows where to start.",
      },
      {
        title: "Readiness Assessment",
        description:
          "An honest read on data, integrations, and governance before anything gets built.",
      },
    ],
  },
  {
    id: "develop",
    number: "2",
    navLabel: "2. Develop",
    title: "Develop",
    subtitle: "Build production systems, not demos",
    description:
      "Our engineers build AI into your existing stack: internal apps, data pipelines, and agents designed for security, reliability, and real use. Production standards from the start. Nothing that dies in staging.",
    whatWeDo: [
      {
        title: "Architecture & Scoping",
        description:
          "Clear plan for scope, data flows, integrations, and success criteria before code is written.",
      },
      {
        title: "Systems Integration",
        description:
          "Embed AI into the tools and workflows your team already uses.",
      },
      {
        title: "Prototype to Production",
        description:
          "Validate in live workflows, then harden to production-grade quality.",
      },
      {
        title: "Security & Governance",
        description:
          "Access controls, audit trails, and guardrails built in from day one.",
      },
      {
        title: "Quality & Performance",
        description:
          "Tune accuracy, reliability, and cost before anything rolls out broadly.",
      },
    ],
  },
  {
    id: "adopt",
    number: "3",
    navLabel: "3. Adopt",
    title: "Adopt",
    subtitle: "Make AI part of how work gets done",
    description: [
      "Building is not the finish line.",
      "We work alongside your teams until new systems are understood, trusted, and used daily. The goal is adoption your company owns, not a vendor dependency.",
    ],
    whatWeDo: [
      {
        title: "Pilot & Rollout",
        description:
          "Introduce systems carefully, gather feedback, refine before scaling.",
      },
      {
        title: "Team Enablement",
        description:
          "Train teams on when, how, and why to use what was built.",
      },
      {
        title: "Workflow Integration",
        description:
          "Embed AI into daily routines without disrupting how work gets done.",
      },
      {
        title: "Adoption Tracking",
        description:
          "Measure usage and impact. Improve until it runs without us.",
      },
    ],
  },
] as const;

export const PROCESS_SECTION = {
  title: "How we work.",
  ctaLabel: "get in touch",
  ctaHref: "/work-with-us",
  steps: [
    {
      number: "1",
      title: "Identify",
      serviceTab: "identify",
      description:
        "Map how work flows. Find the AI opportunities that will change how teams operate, not just one isolated task.",
    },
    {
      number: "2",
      title: "Develop",
      serviceTab: "develop",
      description:
        "Senior engineers build internal apps, pipelines, and agents into your stack. Production quality, built to last.",
    },
    {
      number: "3",
      title: "Adopt",
      serviceTab: "adopt",
      description:
        "Stay until your team uses it daily. Training, integration, and refinement until AI is part of how work gets done.",
    },
  ],
} as const;

export type StatItem =
  | { label: string; display: string }
  | { label: string; target: number; suffix: string };

export const STATS: StatItem[] = [
  { label: "production systems shipped", target: 50, suffix: "+" },
  { label: "senior engineers on every build", target: 17, suffix: "" },
  { label: "phases from discovery to adoption", display: "3" },
];

export type HeroClient = {
  name: string;
  slug: string;
  logo: string;
  logoClass?: string;
};

export const HERO_CLIENTS: HeroClient[] = [
  {
    name: "Meta",
    slug: "meta",
    logo: "/images/clients/meta.png",
    logoClass: "h-6 max-w-[5.5rem] sm:h-7 sm:max-w-[6.25rem]",
  },
  {
    name: "SIEMENS",
    slug: "siemens",
    logo: "/images/clients/siemens.png",
    logoClass: "h-5 max-w-[7rem] sm:h-6 sm:max-w-[8rem]",
  },
  {
    name: "SignalFire",
    slug: "signalfire",
    logo: "/images/clients/signalfire.png",
    logoClass: "h-6 max-w-[8.5rem] sm:h-7 sm:max-w-[9.5rem]",
  },
  {
    name: "Fifty Three Stations",
    slug: "fifty-three-stations",
    logo: "/images/clients/fifty-three-stations.png",
    logoClass: "h-10 max-w-[3.5rem] sm:h-11 sm:max-w-[4rem]",
  },
  {
    name: "FELT.",
    slug: "felt",
    logo: "/images/clients/felt.png",
    logoClass: "h-5 max-w-[4.25rem] sm:h-6 sm:max-w-[5rem]",
  },
  {
    name: "Dude Wipes",
    slug: "dude-wipes",
    logo: "/images/clients/dude-wipes.png",
    logoClass: "h-8 max-w-[3.5rem] sm:h-9 sm:max-w-[4rem]",
  },
];

export const FAQ_SECTION = {
  title: "FAQs",
  subtitle: "Straight answers.",
} as const;

export const FAQS: { question: string; answer: string }[] = [
  {
    question: "What is Imaginary Space?",
    answer:
      "An AI adoption partner for venture-backed and enterprise teams. We help companies adopt AI the right way: custom operations layers, internal apps, data pipelines, and agents built around how you work. Same senior team from discovery through adoption.",
  },
  {
    question: "Do you work with venture firms?",
    answer:
      "Yes. We partner with GPs and platform teams to drive AI adoption across portfolio companies, from identifying the right use cases to building and embedding systems inside the companies you back.",
  },
  {
    question: "How are you different from other AI studios?",
    answer:
      "Senior team, from first conversation to adoption. You work directly with the 17 engineers who build and own the work. No offshore bench, no junior layers. Clients choose us because we stay until AI is part of how their company operates.",
  },
  {
    question: "What happens after you deliver?",
    answer:
      "We train your team, track adoption, and refine until the system runs without us. Adoption is the goal, not a handover deck.",
  },
  {
    question: "How much time does our team need to commit?",
    answer:
      "As little as possible. Your involvement is scoped to share domain knowledge and validate in live workflows. We handle the engineering and integration.",
  },
  {
    question: "Why focus on adoption instead of just building a product?",
    answer:
      "A product that solves one problem does not change a company. We build systems that improve how teams operate, think, and use AI day to day. That is what lasting value looks like.",
  },
  {
    question: "We tried AI before and it did not stick. Why would this be different?",
    answer:
      "Most teams fail because they pick the wrong use cases, stop at the prototype, or never invest in adoption. We stay through all three phases so AI becomes part of how work gets done.",
  },
];

export const CASE_STUDIES_SECTION = {
  title: "Work we've shipped",
} as const;

export const CTA_SECTION = {
  lines: [
    { text: "Ready to adopt AI the right way?", tone: "primary" as const },
    { text: "We build around how you work.", tone: "mid" as const },
    { text: "Let's talk.", tone: "accent" as const },
  ],
  ctaLabel: "Get in touch",
  ctaHref: "/work-with-us",
} as const;

export type CaseStudy = {
  slug: string;
  label: string;
  title: string;
  blurb: string;
  image: string;
  subtitle: string;
  metrics: { value: string; label: string }[];
  problem: string;
  solution: string;
  results: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "landible",
    label: "Land Development",
    title: "Land Use, Automated",
    blurb:
      "An AI-powered RFI platform that turns days of manual land-use research into seconds.",
    image: "/images/landible.png",
    subtitle:
      "Accepts any template, auto-fills from authoritative sources, and validates with integrated mapping.",
    metrics: [
      { value: "428%", label: "Time saved on RFI completion" },
      { value: "8+", label: "Authoritative data sources" },
    ],
    problem:
      "Land developers spend days completing RFIs manually, gathering data from government sources, juggling template formats, and coordinating across teams. Projects stall for weeks and data errors are costly.",
    solution:
      "An AI-powered RFI platform that accepts any template format, auto-fills fields from 8+ authoritative data sources, and validates with integrated mapping. Manual research replaced by automated data collection with export-ready outputs for any agency.",
    results:
      "428% time savings on RFI completion and higher data accuracy through automated validation. Teams manage multiple projects without expanding headcount.",
  },
  {
    slug: "measure-ai",
    label: "Construction · MEP",
    title: "Your Drawings, Measured in Minutes",
    blurb:
      "AI that reads MEP drawings and builds a tender-ready Bill of Quantities in minutes.",
    image: "/images/measure-ai.png",
    subtitle:
      "Reads your drawings, identifies every component, and builds a structured Bill of Quantities automatically.",
    metrics: [
      { value: "< 3 min", label: "10 drawings processed" },
      { value: "±2%", label: "Measurement accuracy" },
      { value: "15+", label: "Component types detected" },
    ],
    problem:
      "Engineers receive 2D PDF drawings and spend hours tracing ductwork runs, counting fittings, and building Bills of Quantities by hand. Manual processes mean inconsistent accuracy and estimators buried in spreadsheets.",
    solution:
      "One platform that reads drawings, identifies every duct, fitting, damper, and diffuser, and builds a structured Bill of Quantities automatically. Every detection is reviewable with confidence scores and interactive overlays.",
    results:
      "10 drawings processed in under 3 minutes, measurement accuracy within ±2%, and every quantity traceable back to the exact drawing it came from.",
  },
  {
    slug: "flor-work",
    label: "DevTools · SaaS",
    title: "Engineering Ops, Automated",
    blurb:
      "An AI agent that plans sprints, assigns work, and keeps engineering teams aligned.",
    image: "/images/flor-work.png",
    subtitle:
      "Generates sprint plans, assigns tasks by skill and capacity, and keeps everyone aligned.",
    metrics: [
      { value: "40%", label: "Less meeting time" },
      { value: "3x", label: "Faster sprint planning" },
      { value: "500+", label: "Teams using the platform" },
    ],
    problem:
      "Engineering teams lose hours every week to sprint planning, standups, and status updates. Work falls through the cracks and senior engineers spend less time building.",
    solution:
      "An AI agent that generates sprint plans, assigns tasks by skill and capacity, and keeps teams aligned through Slack. Integrates with GitHub, Jira, Linear, and Notion.",
    results:
      "40% less meeting time, 3x faster sprint planning, and 500+ teams now run engineering ops with less overhead.",
  },
];

export const TEAM_HERO = {
  titleLine1: "Elite team.",
  titleLine2: "Elite product.",
} as const;

export const TEAM_INTRO = [
  "Imaginary Space is a senior product studio built around one belief: companies need to adopt AI the right way, not just buy another tool.",
  "We work with venture-backed companies and enterprise teams who want a partner that stays. The same engineers who scope the work are the ones who build it and see it through adoption.",
] as const;

export const TEAM_LEADS = [
  {
    firstName: "Harry",
    lastName: "Roper",
    title: "Founder & CEO",
    photo: "/images/team/harry-roper.png",
    bio: "Harry Roper is Founder and CEO of Imaginary Space, an AI-native product studio that has shipped over 50 products for venture-backed founders and enterprise teams. He has spent seven years building the team and methodology to help companies adopt AI the right way. Clients include Dude Wipes, Fifty Three Stations, the UK Military, SignalFire, Renegade Partners, and Plato. He writes and speaks on AI adoption, product quality, and what good looks like from the inside.",
    gradient: "from-[#0a1628] via-[#0d1e3a] to-[#0a1020]",
  },
  {
    firstName: "Franco",
    lastName: "Albarracin",
    title: "Co-Founder & CTO",
    photo: "/images/team/franco-albarracin.png",
    bio: "Franco Albarracin is Co-Founder and CTO of Imaginary Space, leading a 17-person engineering team that delivers production-ready SaaS and AI systems. His background spans mobile development, RPA, and scalable architecture. He sets the production standards, architecture decisions, and engineering structure behind every build.",
    gradient: "from-[#0a1a2e] via-[#0d2440] to-[#091020]",
  },
] as const;

export const TEAM_MEMBERS = [
  {
    name: "Verity Formentera",
    title: "US Operations",
    photo: "/images/team/verity-formentera.png",
    initials: "VF",
    gradient: "from-[#0d1628] to-[#0a1020]",
  },
  {
    name: "Marcelo Diaz",
    title: "Co-Founder & Developer",
    photo: "/images/team/marcelo-diaz.png",
    initials: "MD",
    gradient: "from-[#0a1e2e] to-[#091420]",
  },
  {
    name: "Carlos Gutierrez",
    title: "Growth Lead",
    photo: "/images/team/carlos-gutierrez.png",
    initials: "CG",
    gradient: "from-[#1a0e24] to-[#100818]",
  },
  {
    name: "Francisco Diaz",
    title: "Developer",
    photo: "/images/team/francisco-diaz.png",
    initials: "FD",
    gradient: "from-[#1a1008] to-[#100a04]",
  },
  {
    name: "Ulises Gil",
    title: "Head of Communications",
    photo: "/images/team/ulises-gil.png",
    initials: "UG",
    gradient: "from-[#0a1628] via-[#0d1e3a] to-[#0a1020]",
  },
] as const;

export const CONTACT_PAGE = {
  eyebrow: "Work With Us",
  headline: "Looking for the right partner?",
  headlineAccent: "",
  intro:
    "Venture firm, enterprise team, or portfolio company: tell us about your company and what adoption looks like for you. We respond within one business day.",
  successTitle: "Message received",
  successBody:
    "Thanks for reaching out. We'll review your message and respond within one business day.",
  sendAnother: "Send another message",
  submitLabel: "Send Message →",
  submittingLabel: "Sending…",
} as const;
