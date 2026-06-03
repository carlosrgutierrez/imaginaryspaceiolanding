"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Button from "@/components/ui/Button";
import { SCROLL_VALUE_BLOCK, STORY_PARAGRAPHS } from "@/lib/constants";

function buildStepClipPath(
  blocks: { h: number; delay: number }[],
  progress: number
): string {
  const n = blocks.length;
  const pts: string[] = [];
  blocks.forEach((block, i) => {
    const x1 = ((i / n) * 100).toFixed(4);
    const x2 = (((i + 1) / n) * 100).toFixed(4);
    // Each block transitions to 0 at its own staggered rate
    const bStart = block.delay * 0.45;
    const bEnd = Math.min(bStart + 0.6, 1);
    const bp = Math.max(0, Math.min(1, (progress - bStart) / (bEnd - bStart)));
    const h = (block.h * (1 - bp)).toFixed(2);
    pts.push(`${x1}% ${h}px`, `${x2}% ${h}px`);
  });
  pts.push("100% 100%", "0% 100%");
  return `polygon(${pts.join(", ")})`;
}

const PARA_COUNT = STORY_PARAGRAPHS.length;
// Compress color transitions to finish by 55% of total scroll — leaves room for cover
const SCROLL_END = 0.55;
const PARA_SHARE = SCROLL_END / PARA_COUNT;
const FADE = 0.06;

function useParagraphColor(progress: MotionValue<number>, index: number) {
  const activateAt = index * PARA_SHARE;
  const deactivateAt = (index + 1) * PARA_SHARE;
  const isLast = index === PARA_COUNT - 1;

  if (isLast) {
    return useTransform(
      progress,
      [activateAt, activateAt + FADE],
      ["rgba(255,255,255,0.18)", "rgba(255,255,255,1)"]
    );
  }

  return useTransform(
    progress,
    [activateAt, activateAt + FADE, deactivateAt - FADE, deactivateAt],
    [
      "rgba(255,255,255,0.18)",
      "rgba(255,255,255,1)",
      "rgba(255,255,255,1)",
      "rgba(255,255,255,0.18)",
    ]
  );
}

function ParagraphReveal({
  text,
  index,
  progress,
}: {
  text: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const color = useParagraphColor(progress, index);

  return (
    <motion.p
      style={{ color }}
      className="font-sans text-2xl font-normal leading-snug sm:text-3xl lg:text-4xl"
    >
      {text}
    </motion.p>
  );
}

// Tetris blocks that drop in at the top of the value section
const GRID_BLOCKS = [
  { h: 100, delay: 0.03 },
  { h: 52,  delay: 0.00 },
  { h: 148, delay: 0.12 },
  { h: 68,  delay: 0.07 },
  { h: 120, delay: 0.18 },
  { h: 44,  delay: 0.02 },
  { h: 136, delay: 0.15 },
  { h: 60,  delay: 0.09 },
  { h: 112, delay: 0.20 },
  { h: 80,  delay: 0.05 },
  { h: 144, delay: 0.13 },
  { h: 56,  delay: 0.01 },
  { h: 128, delay: 0.17 },
  { h: 72,  delay: 0.10 },
  { h: 96,  delay: 0.21 },
  { h: 48,  delay: 0.06 },
];
const BLOCK_MAX_H = Math.max(...GRID_BLOCKS.map((b) => b.h));

export default function ScrollRevealText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const valueSectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [para1, para2] = SCROLL_VALUE_BLOCK.paragraphs;

  // Text drifts up slowly as scroll ends — value block overtakes it at normal speed
  const contentY = useTransform(scrollYProgress, [0.4, 1], ["0%", "-25%"]);

  // Clip-path: stepped top edge → flat straight line as story scroll completes
  const clipProgress = useTransform(scrollYProgress, [0.68, 0.98], [0, 1]);
  const [sectionClipPath, setSectionClipPath] = useState(() =>
    buildStepClipPath(GRID_BLOCKS, 0)
  );
  useMotionValueEvent(clipProgress, "change", (p) => {
    setSectionClipPath(buildStepClipPath(GRID_BLOCKS, p));
  });

  return (
    <>
      {/* Scroll-reveal paragraphs */}
      <section
        ref={containerRef}
        style={{ height: `${PARA_COUNT * 65 + 80}vh` }}
        className="relative"
        aria-label="Our story"
      >
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <motion.div
            style={{ y: contentY }}
            className="mx-auto w-full max-w-3xl px-6 lg:px-8"
          >
            <div className="flex flex-col gap-8 sm:gap-10">
              {STORY_PARAGRAPHS.map((text, i) => (
                <ParagraphReveal
                  key={text}
                  text={text}
                  index={i}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </motion.div>
        </div>

      </section>

      {/* Value block — slides up over the scroll section */}
      <section
        ref={valueSectionRef}
        className="border-hatch-bottom relative z-10 -mt-[80vh] py-20 sm:py-28"
        style={{
          background: "radial-gradient(ellipse 90% 55% at 50% 0%, rgba(96,165,250,0.10) 0%, transparent 65%), #0a0a0a",
          clipPath: sectionClipPath,
        }}
      >

        <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
          <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Our mission
          </p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ hidden: {}, visible: {} }}
          >
            <div className="overflow-hidden">
              <motion.h2
                className="font-sans text-3xl font-medium leading-tight text-text-primary sm:text-4xl lg:text-5xl"
                variants={{ hidden: { y: "105%" }, visible: { y: "0%", transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } }}
              >
                {SCROLL_VALUE_BLOCK.headlinePrefix}{" "}
                <span className="text-accent">{SCROLL_VALUE_BLOCK.headlineBrand}.</span>
              </motion.h2>
            </div>
          </motion.div>

          <p className="mt-6 font-sans text-base leading-relaxed text-text-secondary/70">
            <span className="font-semibold text-text-primary">{SCROLL_VALUE_BLOCK.lead}</span>{" "}
            {para1} {para2}
          </p>

          <div className="mt-8">
            <Link href={SCROLL_VALUE_BLOCK.ctaHref}>
              <Button
                variant="ghost"
                size="lg"
                className="bg-white/5 text-text-secondary hover:bg-white/10 hover:text-text-primary"
              >
                Work with us &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
