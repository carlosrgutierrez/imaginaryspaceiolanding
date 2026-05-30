"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FadeInView from "@/components/animations/FadeInView";
import { FAQS, FAQ_SECTION } from "@/lib/constants";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-[7.5rem]">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <FadeInView className="text-center mb-14">
          <h2 className="font-serif text-4xl lg:text-5xl text-text-primary">
            {FAQ_SECTION.title}
          </h2>
          <p className="mt-5 font-sans text-text-secondary text-base">
            {FAQ_SECTION.subtitle}
          </p>
        </FadeInView>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <FadeInView key={i} delay={i * 0.04}>
                <div
                  className={`border rounded-card overflow-hidden transition-colors ${
                    isOpen
                      ? "border-accent/30 bg-[rgba(96,165,250,0.05)]"
                      : "border-white/8 bg-bg-card hover:border-white/16"
                  }`}
                >
                  <button
                    id={`faq-btn-${i}`}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="font-sans font-medium text-text-primary text-sm">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0"
                    >
                      <ChevronDown
                        size={16}
                        className={isOpen ? "text-accent" : "text-text-muted"}
                      />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        id={`faq-answer-${i}`}
                        role="region"
                        aria-labelledby={`faq-btn-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 font-sans text-text-secondary text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
