export const SITE_NAME = "Imaginary Space";
export const SITE_TAGLINE = "We don't just talk AI. We deliver it.";
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
  "But months later, the tools sit unused. The pilots never scaled.",
  "You're not behind. You're just stuck in the same place everyone gets stuck.",
  "That's why we built Imaginary Space.",
] as const;

export const VALUE_PROPOSITION = {
  headline: "That's why we built Imaginary Space.",
  paragraphs: [
    "AI that actually moves the needle.",
    "Imaginary Space defines what's worth building, builds it for you, then trains your people to make it stick.",
    "Stop paying to experiment. Start paying for results.",
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

export const MARQUEE_CLIENTS = [
  "Meta",
  "SIEMENS",
  "SignalFire",
  "Fifty Three Stations",
  "FELT.",
  "Dude Wipes",
] as const;

export const FAQS: { question: string; answer: string }[] = [
  {
    question: "What does Imaginary Space actually do?",
    answer:
      "We identify high-value AI use cases inside your organisation, build the solutions, and ensure they are fully adopted by your team.",
  },
  {
    question: "How long does a typical engagement take?",
    answer:
      "Most engagements run 8–16 weeks from discovery to deployment. We move quickly without cutting corners.",
  },
  {
    question: "Do you work with companies that have no AI experience?",
    answer:
      "Yes. Most of our clients are starting from zero. We guide you every step of the way.",
  },
  {
    question: "What industries do you specialise in?",
    answer:
      "We have delivered projects across healthcare, logistics, finance, retail, and professional services.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We work on a fixed-scope project basis. Reach out and we'll scope your project in a free discovery call.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes. We offer retainer-based support and continuous improvement packages post-launch.",
  },
];

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
