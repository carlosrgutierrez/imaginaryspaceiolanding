"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import FadeInView from "@/components/animations/FadeInView";

const TABS = [
  {
    id: "identify",
    label: "1. Identify",
    step: "Step 01",
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
    label: "2. Develop",
    step: "Step 02",
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
    label: "3. Adopt",
    step: "Step 03",
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

type TabId = (typeof TABS)[number]["id"];

export default function ServiceTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hashTab = searchParams.get("tab");
  const initial = TABS.find((t) => t.id === hashTab) ?? TABS[0];
  const [active, setActive] = useState<TabId>(initial.id);

  const activeTab = TABS.find((t) => t.id === active) ?? TABS[0];

  function select(id: TabId) {
    setActive(id);
    router.replace(`${pathname}?tab=${id}`, { scroll: false });
  }

  useEffect(() => {
    const id = searchParams.get("tab");
    const tab = TABS.find((t) => t.id === id);
    if (tab) setActive(tab.id);
  }, [searchParams]);

  return (
    <section id="service-tabs" className="py-[7.5rem] border-t border-white/5">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        {/* Tab bar — scrolls horizontally on mobile, wraps on sm+ */}
        <FadeInView className="mb-16">
        <div
          className="flex gap-2 overflow-x-auto pb-1 scrollbar-none sm:flex-wrap"
          role="tablist"
          aria-label="Service phases"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              id={`tab-btn-${tab.id}`}
              role="tab"
              aria-selected={active === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => select(tab.id)}
              className={`shrink-0 font-sans text-sm font-medium px-5 py-2.5 rounded-full border transition-all duration-200 ${
                active === tab.id
                  ? "bg-accent-grad text-bg-primary border-accent"
                  : "bg-transparent text-text-secondary border-white/10 hover:border-white/30 hover:text-text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        </FadeInView>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id={`tabpanel-${active}`}
            role="tabpanel"
            aria-labelledby={`tab-btn-${active}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left */}
              <div>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-accent mb-4">
                  {activeTab.step}
                </p>
                <h2 className="font-serif text-4xl lg:text-5xl text-text-primary leading-[1.5] mb-3">
                  {activeTab.title}
                </h2>
                {"subtitle" in activeTab && activeTab.subtitle && (
                  <p className="font-sans text-xl text-text-secondary leading-snug mb-6">
                    {activeTab.subtitle}
                  </p>
                )}
                {(Array.isArray(activeTab.description)
                  ? activeTab.description
                  : [activeTab.description]
                ).map((paragraph, i, paragraphs) => (
                  <p
                    key={i}
                    className={`font-sans text-text-secondary text-lg leading-relaxed ${
                      i === paragraphs.length - 1 ? "mb-0" : "mb-4"
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Right — What We Do list */}
              <div>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted mb-6">
                  What We Do
                </p>
                <ul className="flex flex-col gap-5">
                  {activeTab.whatWeDo.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-4 font-sans text-[15px] leading-snug"
                    >
                      <span className="font-mono text-[11px] text-accent/60 mt-1 shrink-0 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-text-primary font-medium">
                          {item.title}
                        </p>
                        {"description" in item && item.description && (
                          <p className="text-text-secondary mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
