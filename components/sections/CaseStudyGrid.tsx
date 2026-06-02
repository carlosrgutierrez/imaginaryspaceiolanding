"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import FadeInView from "@/components/animations/FadeInView";
import RevealHeading from "@/components/animations/RevealHeading";
import { CASE_STUDIES, CASE_STUDIES_SECTION, type CaseStudy } from "@/lib/constants";

const SCRIM =
  "absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(8,10,14,0.30)_0%,rgba(8,10,14,0.10)_42%,rgba(8,10,14,0.76)_100%)]";

export default function CaseStudyGrid() {
  const [active, setActive] = useState<CaseStudy | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActive(null);
    }
    if (active) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section className="py-[7.5rem] border-t border-white/5">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-8">
        <div className="mb-14">
          <RevealHeading className="font-serif text-3xl text-text-primary sm:text-4xl">
            Don't just take our word for it...
          </RevealHeading>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {CASE_STUDIES.map((cs, i) => (
            <FadeInView key={cs.slug} delay={i * 0.12} className="h-full">
              <motion.div
                layoutId={`cs-card-${cs.slug}`}
                onClick={() => setActive(cs)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(cs);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Read case study: ${cs.title}`}
                className="group flex h-full cursor-pointer flex-col border border-white/8 bg-bg-card overflow-hidden transition-colors hover:border-white/16 focus:outline-none focus-visible:border-accent"
              >
                <motion.div
                  layoutId={`cs-image-${cs.slug}`}
                  className="relative h-40 overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cs.image}
                    alt={`${cs.title} product screenshot`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className={SCRIM} />
                </motion.div>

                <div className="flex flex-1 flex-col p-6">
                  <motion.h3
                    layoutId={`cs-title-${cs.slug}`}
                    className="font-serif text-xl text-text-primary leading-snug mb-3 min-h-[3.25rem] line-clamp-2 transition-colors group-hover:text-accent"
                  >
                    {cs.title}
                  </motion.h3>
                  <p className="font-sans text-sm text-text-muted leading-relaxed line-clamp-3 min-h-[3.75rem] flex-1">
                    {cs.blurb}
                  </p>
                  <span className="inline-flex items-center gap-2 mt-auto pt-4 font-sans text-xs font-semibold tracking-[0.04em] text-accent transition-[gap] group-hover:gap-3">
                    Read case study <ArrowRight size={14} />
                  </span>
                </div>
              </motion.div>
            </FadeInView>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key="cs-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] grid place-items-center p-6"
          >
            <div
              onClick={() => setActive(null)}
              className="absolute inset-0 bg-[rgba(5,7,12,0.66)] backdrop-blur-md"
            />

            <motion.div
              layoutId={`cs-card-${active.slug}`}
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              className="relative w-full max-w-[740px] max-h-[88vh] flex flex-col overflow-hidden border border-white/8 bg-bg-card shadow-[0_50px_130px_rgba(0,0,0,0.62)]"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close case study"
                className="absolute top-4 right-4 z-[3] grid place-items-center w-[42px] h-[42px] bg-black/45 border border-white/16 text-white backdrop-blur-sm transition-[transform,background] hover:bg-black/80 hover:rotate-90"
              >
                <X size={18} />
              </button>

              <div className="overflow-y-auto overscroll-contain">
                <motion.div
                  layoutId={`cs-image-${active.slug}`}
                  className="relative h-60 shrink-0 overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={active.image}
                    alt={`${active.title} product screenshot`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,transparent_40%,rgba(10,10,10,0.55)_100%)]" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12, duration: 0.3 }}
                  className="p-8 sm:p-10"
                >
                  <motion.h3
                    layoutId={`cs-title-${active.slug}`}
                    className="font-serif text-2xl sm:text-3xl text-text-primary leading-tight mb-3"
                  >
                    {active.title}
                  </motion.h3>
                  <p className="font-sans text-text-secondary text-base leading-relaxed mb-7">
                    {active.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {active.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="flex-1 min-w-[120px] border border-accent/15 bg-accent/[0.06] px-[18px] py-4"
                      >
                        <div className="font-serif text-2xl text-accent-grad leading-none">
                          {m.value}
                        </div>
                        <div className="font-sans text-[11px] text-text-muted leading-snug mt-1.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Block heading="The Problem" body={active.problem} />
                  <Block heading="The Solution" body={active.solution} />
                  <Block heading="The Results" body={active.results} />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Block({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="mt-6 first:mt-0">
      <h4 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-accent mb-2.5">
        {heading}
      </h4>
      <p className="font-sans text-text-secondary text-[15px] leading-relaxed">
        {body}
      </p>
    </div>
  );
}
