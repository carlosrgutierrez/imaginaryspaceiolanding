"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { STORY_PARAGRAPHS } from "@/lib/constants";

const N = STORY_PARAGRAPHS.length;

function ParagraphReveal({
  text,
  index,
  progress,
}: {
  text: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const isLast = index === N - 1;
  const rangeStart = index / N;
  const rangeEnd = (index + 1) / N;
  const pad = 0.06;

  const opacity = useTransform(
    progress,
    isLast
      ? [Math.max(0, rangeStart - pad), Math.min(1, rangeStart + pad * 1.5)]
      : [
          Math.max(0, rangeStart - pad),
          Math.min(1, rangeStart + pad),
          Math.max(0, rangeEnd - pad),
          Math.min(1, rangeEnd + pad),
        ],
    isLast ? [0.1, 1] : [0.1, 1, 1, 0.1]
  );

  return (
    <motion.p
      style={{ opacity }}
      className={`leading-snug font-sans ${
        isLast
          ? "text-2xl sm:text-3xl lg:text-4xl text-accent font-semibold"
          : "text-2xl sm:text-3xl lg:text-4xl text-text-primary font-medium"
      }`}
    >
      {text}
    </motion.p>
  );
}

export default function ScrollRevealText() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalHeight = `${N * 80}vh`;

  return (
    <section ref={containerRef} style={{ height: totalHeight }} className="relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 flex flex-col gap-10">
          {STORY_PARAGRAPHS.map((text, i) => (
            <ParagraphReveal
              key={text}
              text={text}
              index={i}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
