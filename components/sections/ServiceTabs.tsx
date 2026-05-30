"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CircleDot, Layers, Hexagon, type LucideIcon } from "lucide-react";
import { SERVICES_PHASES, type ServicePhase } from "@/lib/constants";

/** Centered column — Morningside side margins */
const CONTENT_WIDTH = "mx-auto w-full max-w-4xl px-6 lg:max-w-5xl lg:px-8";

const PHASE_ICONS: Record<ServicePhase["id"], LucideIcon> = {
  identify: CircleDot,
  develop: Layers,
  adopt: Hexagon,
};

function tabFromHash(hash: string): ServicePhase["id"] | null {
  const id = hash.replace("#", "");
  if (!id || id === "service-tabs") return null;
  return SERVICES_PHASES.find((p) => p.id === id)?.id ?? null;
}

function PhaseNav({
  active,
  onSelect,
}: {
  active: ServicePhase["id"];
  onSelect: (id: ServicePhase["id"]) => void;
}) {
  return (
    <nav
      className="border-b border-white/5 bg-bg-primary"
      aria-label="Service phases"
    >
      <div
        className={`${CONTENT_WIDTH} flex justify-center gap-8 py-5 sm:gap-12 lg:gap-16`}
      >
        {SERVICES_PHASES.map((phase) => {
          const isActive = active === phase.id;
          return (
            <button
              key={phase.id}
              type="button"
              onClick={() => onSelect(phase.id)}
              className={`relative flex flex-col items-center font-sans text-sm transition-colors sm:text-base ${
                isActive ? "text-accent" : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {phase.navLabel}
              {isActive && (
                <span className="mt-1 text-xs leading-none text-accent" aria-hidden>
                  ⌃
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function ServicePhasePanel({ phase }: { phase: ServicePhase }) {
  const Icon = PHASE_ICONS[phase.id];
  const paragraphs = Array.isArray(phase.description)
    ? phase.description
    : [phase.description];

  return (
    <motion.div
      key={phase.id}
      id={`tabpanel-${phase.id}`}
      role="tabpanel"
      aria-labelledby={`tab-btn-${phase.id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28, ease: "easeInOut" }}
    >
      <div className="rounded-2xl border border-accent/25 bg-bg-card/30 p-6 sm:p-8 lg:p-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-14">
          <div className="flex shrink-0 justify-center lg:justify-start">
            <Icon
              strokeWidth={1}
              className="h-24 w-24 text-white/85 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
              aria-hidden
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-serif text-3xl leading-tight text-text-primary sm:text-4xl lg:text-5xl">
              <sup className="mr-1 align-super text-base font-normal text-accent sm:text-lg">
                {phase.number}
              </sup>
              <span className="text-accent-grad">{phase.title}</span>
            </h2>

            <p className="mt-3 font-sans text-lg text-text-primary sm:text-xl">
              {phase.subtitle}
            </p>

            <div className="mt-6 space-y-4">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="font-sans text-base leading-relaxed text-text-secondary sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/8 pt-8 sm:mt-12 sm:pt-10">
          <h3 className="mb-6 font-serif text-2xl text-text-primary sm:text-3xl">
            What <span className="text-accent">we do</span>
          </h3>

          <ul className="flex flex-col gap-5 sm:gap-6">
            {phase.whatWeDo.map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-3 font-sans text-[15px] leading-snug sm:text-base"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-primary/70" />
                <div>
                  <p className="font-medium text-text-primary">{item.title}</p>
                  <p className="mt-1 leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServiceTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryTab = searchParams.get("tab");
  const initial = SERVICES_PHASES.find((p) => p.id === queryTab) ?? SERVICES_PHASES[0];
  const [active, setActive] = useState<ServicePhase["id"]>(initial.id);

  const activePhase =
    SERVICES_PHASES.find((p) => p.id === active) ?? SERVICES_PHASES[0];

  function select(id: ServicePhase["id"]) {
    setActive(id);
    router.replace(`${pathname}#${id}`, { scroll: false });
  }

  useEffect(() => {
    const fromQuery = searchParams.get("tab");
    const fromHash = tabFromHash(window.location.hash);
    const id = fromHash ?? fromQuery;
    const tab = SERVICES_PHASES.find((p) => p.id === id);
    if (tab) setActive(tab.id);
  }, [searchParams]);

  useEffect(() => {
    function onHashChange() {
      const tab = tabFromHash(window.location.hash);
      if (tab) setActive(tab);
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <section id="service-tabs" className="pb-16 sm:pb-20">
      <PhaseNav active={active} onSelect={select} />

      <div className={`${CONTENT_WIDTH} py-10 sm:py-12`}>
        <AnimatePresence mode="wait">
          <ServicePhasePanel key={activePhase.id} phase={activePhase} />
        </AnimatePresence>
      </div>
    </section>
  );
}
