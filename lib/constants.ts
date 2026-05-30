export const SITE_NAME = "Imaginary Space";
export const SITE_TAGLINE = "We don't just talk AI. We deliver it.";
export const HERO_HEADLINE = SITE_TAGLINE;
export const HERO_SUBTITLE =
  "We help companies identify AI opportunities that will actually transform their business, then we build it, deploy it, and train your team to use it.";
export const HERO_CLIENTS_EYEBROW =
  "From next-gen startups to established enterprises:";
export const SITE_URL = "https://imaginaryspace.co";
export const CONTACT_EMAIL = "carlos@imaginaryspace.ai";
export const CONTACT_LOCATION = "San Francisco, CA";
export const CONTACT_REACH = "Working globally";

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
] as const;

export const STORY_PARAGRAPHS = [
  "You bought the AI tools. Read the case studies. Attended the webinars.",
  "But months later, the tools sit unused. The pilots never scaled. And nobody can explain what ROI actually looks like.",
  "Or you're pre-launch — trying to avoid these exact mistakes.",
  "You're not behind. You're just stuck in the same place everyone gets stuck.",
] as const;

/** Value block — headline appears first, then copy + CTA stack in below (no duplicate beat) */
export const SCROLL_VALUE_BLOCK = {
  headlinePrefix: "That's why we built",
  headlineBrand: SITE_NAME,
  lead: "AI that actually moves the needle.",
  paragraphs: [
    "Imaginary Space defines what's worth building, builds it for you, then trains your people to make it stick.",
    "Stop paying to experiment. Start paying for results.",
  ],
  ctaLabel: "get in touch",
  ctaHref: "/work-with-us",
} as const;

/** @deprecated Use SCROLL_VALUE_BLOCK — kept for ValueProposition.tsx if referenced elsewhere */
export const VALUE_PROPOSITION = {
  headline: `${SCROLL_VALUE_BLOCK.headlinePrefix} ${SCROLL_VALUE_BLOCK.headlineBrand}.`,
  paragraphs: [SCROLL_VALUE_BLOCK.lead, ...SCROLL_VALUE_BLOCK.paragraphs],
} as const;

export const SERVICES_HERO = {
  titleLead: "From Trying AI to",
  titleAccent: "Trusting It.",
  subtitle:
    "We help you identify, build, and adopt AI that actually delivers.",
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
    subtitle: "Decide what's actually worth building",
    description:
      "Before anything gets built, we get aligned. We take the time to understand how work really happens inside your organisation — where time is lost, decisions slow down, and manual effort piles up. Then we narrow everything down to the small set of opportunities that will create real, measurable impact. This phase ensures you're not guessing, and not wasting time building the wrong thing.",
    whatWeDo: [
      {
        title: "Executive Alignment Workshops",
        description:
          "Get leadership aligned on priorities, constraints, and what success actually looks like.",
      },
      {
        title: "Employee & Stakeholder Interviews",
        description:
          "Speak with the people doing the work to uncover bottlenecks, inefficiencies, and hidden opportunities.",
      },
      {
        title: "ROI Modeling & Business Case Design",
        description:
          "Pressure-test ideas early and focus only on what's worth the investment.",
      },
      {
        title: "Prioritization Mapping",
        description:
          "Stack-rank opportunities by impact and effort so everyone knows where to start.",
      },
      {
        title: "AI Readiness & Diagnostics Report",
        description:
          "A clear view of where you're ready now, what needs work, and what should wait.",
      },
    ],
  },
  {
    id: "develop",
    number: "2",
    navLabel: "2. Develop",
    title: "Develop",
    subtitle: "Build it right so it works from day one.",
    description:
      "Once priorities are clear, we move into execution. This is where strategy becomes reality. We plan and build AI systems that integrate cleanly into your existing tools and workflows — designed for reliability, security, and real-world use. No fragile demos. No science projects.",
    whatWeDo: [
      {
        title: "Scoping & Technical Architecture",
        description:
          "Translate priorities into a clear build plan — defining scope, data flows, integrations, and success criteria upfront.",
      },
      {
        title: "Data & Systems Integration",
        description:
          "Embed AI into your existing stack so it fits naturally into how work already happens.",
      },
      {
        title: "Proof of Concept → Production Build",
        description:
          "Build quickly, test in real workflows, then harden what works into a production-ready system.",
      },
      {
        title: "Security, Governance & Reliability Design",
        description:
          "Implement access controls, monitoring, and guardrails so systems are safe, auditable, and dependable.",
      },
      {
        title: "Performance Tuning & Optimization",
        description:
          "Improve accuracy, speed, and cost efficiency before anything is rolled out broadly.",
      },
    ],
  },
  {
    id: "adopt",
    number: "3",
    navLabel: "3. Adopt",
    title: "Adopt",
    subtitle: "Make AI part of how work actually gets done",
    description: [
      "Shipping software isn't success.",
      "Adoption is. In this phase, we work side by side with your teams to ensure new systems are understood, trusted, and used every day. The goal isn't a \"handover\" — it's ownership.",
    ],
    whatWeDo: [
      {
        title: "Pilot Launch & Controlled Rollout",
        description:
          "Introduce systems intentionally, gather feedback, and refine before scaling.",
      },
      {
        title: "AI Enablement Sessions",
        description:
          "Hands-on training so teams know when and how to use what's been built.",
      },
      {
        title: "Workflow Integration Support",
        description:
          "Embed AI into existing routines without slowing anyone down.",
      },
      {
        title: "Performance Tracking & Ongoing Optimization",
        description:
          "Measure impact, improve continuously, and lock in the gains.",
      },
    ],
  },
] as const;

export const PROCESS_SECTION = {
  title: "Our days consist of three things...",
  ctaLabel: "get in touch",
  ctaHref: "/work-with-us",
  steps: [
    {
      number: "1",
      title: "Identify",
      serviceTab: "identify",
      description:
        "Every project starts with clarity. We start by understanding how your team actually works — where time is being lost, what slows things down, and why work piles up. From there, we find the 5% of opportunities worth building.",
    },
    {
      number: "2",
      title: "Develop",
      serviceTab: "develop",
      description:
        "Once we know what matters, we move quickly and get to the building. Our team plans and develops solutions that fit seamlessly into your existing systems — built the right way, so they work exactly as they should from day one.",
    },
    {
      number: "3",
      title: "Adopt",
      serviceTab: "adopt",
      description:
        "Then we make it real. We work side by side with your teams — training, fine-tuning, and helping them integrate your new systems into their everyday work. By the time we step back, it's not a project anymore — it's just how work gets done.",
    },
  ],
} as const;

export type StatItem =
  | { label: string; display: string }
  | { label: string; target: number; suffix: string };

export const STATS: StatItem[] = [
  { label: "AI products shipped", target: 50, suffix: "+" },
  { label: "average MVP delivery", display: "6 Weeks" },
  { label: "faster than traditional agencies", target: 10, suffix: "x" },
];

export const HERO_CLIENTS = [
  "Meta",
  "SIEMENS",
  "SignalFire",
  "Fifty Three Stations",
  "FELT.",
  "Dude Wipes",
] as const;

export const FAQ_SECTION = {
  title: "FAQs",
  subtitle: "You've got questions. We've got answers.",
} as const;

export const FAQS: { question: string; answer: string }[] = [
  {
    question:
      "How is Imaginary Space different from every other AI company out there?",
    answer:
      "We're workflow specialists first, AI specialists second. We start by understanding how your teams actually work, then reimagine what's possible with AI—without pushing any single tool or platform. We are tool-agnostic, industry-agnostic, but results-obsessed.",
  },
  {
    question: "How do I know if we're ready for AI?",
    answer:
      "You're ready if you have clear pain points, repetitive work, or untapped data slowing things down. We'll help you figure out what's worth automating - and what's not.",
  },
  {
    question: "What happens after you deliver?",
    answer:
      "We don't hand off and vanish. We train your people, monitor how it's used, and refine until it runs smoothly without us.",
  },
  {
    question: "How much internal time will this take?",
    answer:
      "We know that you hired us to get things off of your team's plate. So, we keep your team's involvement focused and efficient - just enough to capture what matters, then we do the rest.",
  },
  {
    question: "How long until we see real results?",
    answer:
      "You'll typically see a working pilot within weeks, not months. We move fast, test early, and scale only once it's proven.",
  },
  {
    question:
      "We don't have clean data or a big tech team—can we still do this?",
    answer:
      "Too vague to answer. If this sounds like you, let's have a chat. Bottom line: We work with what you have, design around your existing systems, and handle the technical lift so your team can focus on their real work.",
  },
  {
    question:
      "We've already tried AI and it didn't work. Why would this be any different?",
    answer:
      "Most teams fail because they start with the wrong use cases or stop at the prototype. We focus only on what's worth building and stay through adoption - so it actually ships and delivers.",
  },
];

export const CASE_STUDIES_SECTION = {
  title: "Don't just take our word for it...",
} as const;

export const CTA_SECTION = {
  lines: [
    { text: "AI is here. Most will react.", tone: "primary" as const },
    { text: "The few with a plan will lead.", tone: "mid" as const },
    { text: "We build for those few.", tone: "accent" as const },
  ],
  ctaLabel: "get in touch",
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
      "An AI-powered RFI platform that accepts any template, auto-fills from authoritative sources, and validates with integrated mapping.",
    metrics: [
      { value: "428%", label: "Time saved on RFI completion" },
      { value: "8+", label: "Authoritative data sources" },
    ],
    problem:
      "Land developers spend days completing RFIs manually—gathering data from government sources, juggling template formats, and coordinating feedback across teams. Projects stall for weeks, data errors are costly, and smaller teams can't compete without dedicated research staff.",
    solution:
      "An AI-powered RFI platform that accepts any template format, auto-fills fields from 8+ authoritative data sources, and validates with integrated mapping. Hours of manual research are replaced by seconds of automated data collection — with visual overlays for zoning, floodplains, and parcel boundaries, plus export-ready PDFs and CSVs for any agency.",
    results:
      "428% time savings on RFI completion and higher data accuracy through automated validation. Teams manage multiple projects without expanding headcount — and smaller firms now compete with enterprise players using the same authoritative data sources.",
  },
  {
    slug: "measure-ai",
    label: "Construction · MEP",
    title: "Your Drawings, Measured in Minutes",
    blurb:
      "AI that reads MEP drawings and builds a tender-ready Bill of Quantities in minutes.",
    image: "/images/measure-ai.png",
    subtitle:
      "One platform that reads your drawings, identifies every component, and builds a structured Bill of Quantities automatically.",
    metrics: [
      { value: "< 3 min", label: "10 drawings processed" },
      { value: "±2%", label: "Measurement accuracy" },
      { value: "15+", label: "Component types detected" },
    ],
    problem:
      "Engineers receive 2D PDF drawings and spend hours tracing ductwork runs, counting fittings, and building Bills of Quantities by hand — one fitting at a time. Manual processes mean inconsistent accuracy, slow turnaround, and estimators buried in spreadsheets instead of winning work.",
    solution:
      "One platform that reads your drawings, identifies every duct, fitting, damper, and diffuser, and builds a structured Bill of Quantities automatically. Upload your PDFs and let the AI detect, classify, and measure over 15 core component types — review every detection with confidence scores and interactive overlays, then export a fully structured BOQ (NRM, SMM7, or DW144) directly to Excel or PDF.",
    results:
      "10 drawings processed in under 3 minutes, measurement accuracy within ±2%, and every quantity traceable back to the exact drawing it came from — moving ventilation teams from manual takeoff to tender-ready output with auditability built in.",
  },
  {
    slug: "flor-work",
    label: "DevTools · SaaS",
    title: "Ship Faster. Manage Less.",
    blurb:
      "An AI agent that plans sprints, assigns work, and keeps engineering teams in sync.",
    image: "/images/flor-work.png",
    subtitle:
      "An AI agent that generates sprint plans, assigns tasks by skill and capacity, and keeps everyone in sync — no standups needed.",
    metrics: [
      { value: "40%", label: "Less meeting time" },
      { value: "3x", label: "Faster sprint planning" },
      { value: "500+", label: "Teams shipping faster" },
    ],
    problem:
      "Engineering teams are drowning in project management overhead — sprint planning, standups, and status updates consume hours every week. Engineers spend 40% less time coding, sprint planning takes days, and tasks fall through the cracks. Teams without PMs are forced to choose between speed and organization.",
    solution:
      "An AI agent that generates sprint plans in seconds, assigns tasks by skill and capacity, and keeps everyone in sync through Slack — no standups needed. It plugs into GitHub, Jira, Linear, and Notion, detects blockers before they escalate, and runs on enterprise-grade, scalable infrastructure.",
    results:
      "40% less meeting time, 3x faster sprint planning, and 95% accuracy on AI-generated task assignments. 500+ teams now ship faster without sacrificing visibility — because the best project management is the kind you never think about.",
  },
];

export const TEAM_HERO = {
  titleLine1: "Your AI Transformation",
  titleLine2: "Partner.",
} as const;

export const TEAM_INTRO = [
  "Imaginary Space was founded by two friends who saw, early on, the profound impact artificial intelligence would have on organisations over the coming decade. What began as a small, focused studio has grown into a team across the globe.",
  "Today, we operate as the AI transformation partner to some of the world's leading organisations helping them move beyond experimentation and embed AI at the core of how they operate.",
] as const;

export const TEAM_LEADS = [
  {
    firstName: "Harry",
    lastName: "Roper",
    title: "Founder & CEO",
    photo: "/images/team/harry-roper.png",
    bio: "Harry Roper is the Founder and CEO of Imaginary Space, an AI-native product studio that has shipped over 50 products for venture-backed founders and enterprise teams across industries. Harry has spent the last seven years building the infrastructure, team, and methodology to take bold ideas from concept to scalable software in weeks. His clients include Dude Wipes, the UK Military, SignalFire, Renegade Partners, and Plato. Harry is a practitioner first—actively building, shipping, and documenting in public—and brings that same hands-on intensity to every engagement Imaginary Space takes on.",
    gradient: "from-[#0a1628] via-[#0d1e3a] to-[#0a1020]",
  },
  {
    firstName: "Franco",
    lastName: "Albarracin",
    title: "Co-Founder & CTO",
    photo: "/images/team/franco-albarracin.png",
    bio: "Franco Albarracin is the Co-Founder and CTO of Imaginary Space, where he leads a 17-person engineering team delivering production-ready SaaS and AI systems for venture-backed startups and enterprise clients. With a background spanning mobile development, RPA, and scalable architecture, Franco brings over five years of hands-on engineering leadership to every build. Franco's focus is consistent: serious software, built fast, without sacrificing the architectural integrity that makes it last.",
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
