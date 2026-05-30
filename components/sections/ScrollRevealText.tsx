"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Button from "@/components/ui/Button";
import { SCROLL_VALUE_BLOCK, STORY_PARAGRAPHS } from "@/lib/constants";

const STORY_COUNT = STORY_PARAGRAPHS.length;
const VALUE_INDEX = STORY_COUNT;
const STORY_VH = 85;
const VALUE_VH = 95;
const TOTAL_VH = STORY_COUNT * STORY_VH + VALUE_VH;
const FADE = 0.035;
/** Scroll progress where value block begins fading out for section handoff */
const VALUE_EXIT_START = 0.93;

function segmentRange(index: number) {
  if (index < STORY_COUNT) {
    return {
      start: (index * STORY_VH) / TOTAL_VH,
      end: ((index + 1) * STORY_VH) / TOTAL_VH,
    };
  }
  return {
    start: (STORY_COUNT * STORY_VH) / TOTAL_VH,
    end: 1,
  };
}

function useSegmentOpacity(
  progress: MotionValue<number>,
  index: number,
  mode: "cycle" | "hold"
) {
  const { start, end } = segmentRange(index);

  if (mode === "hold") {
    return useTransform(
      progress,
      [0, start, start + FADE, 1],
      [0, 0, 1, 1]
    );
  }

  return useTransform(
    progress,
    [0, start, start + FADE, end - FADE, end, 1],
    [0, 0, 1, 1, 0, 0]
  );
}

/** Reveal copy inside the value segment — headline first, then rest stacks below */
function useValueReveal(progress: MotionValue<number>, phase: number) {
  const { start, end } = segmentRange(VALUE_INDEX);
  const span = end - start;
  const revealAt = start + span * phase;
  const fade = span * 0.1;

  return useTransform(
    progress,
    [0, revealAt, revealAt + fade, 1],
    [0, 0, 1, 1]
  );
}

function StoryLine({
  text,
  index,
  progress,
}: {
  text: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const opacity = useSegmentOpacity(progress, index, "cycle");

  return (
    <motion.h2
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 text-center font-sans text-2xl font-medium leading-snug text-text-primary sm:text-3xl lg:text-4xl"
    >
      {text}
    </motion.h2>
  );
}

function ValueBlock({ progress }: { progress: MotionValue<number> }) {
  const containerOpacity = useSegmentOpacity(progress, VALUE_INDEX, "hold");
  const headlineOpacity = useValueReveal(progress, 0.06);
  const leadOpacity = useValueReveal(progress, 0.3);
  const para1Opacity = useValueReveal(progress, 0.46);
  const para2Opacity = useValueReveal(progress, 0.62);
  const ctaOpacity = useValueReveal(progress, 0.68);
  const exitOpacity = useTransform(
    progress,
    [VALUE_EXIT_START, 0.985],
    [1, 0]
  );

  const [para1, para2] = SCROLL_VALUE_BLOCK.paragraphs;

  return (
    <motion.div
      style={{ opacity: containerOpacity }}
      className="absolute inset-0 flex items-center justify-center px-4"
    >
      <motion.div
        style={{ opacity: exitOpacity }}
        className="flex max-w-2xl flex-col items-center gap-4 text-center sm:gap-5"
      >
        <motion.h2
          style={{ opacity: headlineOpacity }}
          className="font-sans text-2xl font-medium leading-snug text-text-primary sm:text-3xl lg:text-4xl"
        >
          {SCROLL_VALUE_BLOCK.headlinePrefix}{" "}
          <span className="text-accent">{SCROLL_VALUE_BLOCK.headlineBrand}.</span>
        </motion.h2>

        <motion.p
          style={{ opacity: leadOpacity }}
          className="font-sans text-xl font-medium text-text-primary sm:text-2xl"
        >
          {SCROLL_VALUE_BLOCK.lead}
        </motion.p>

        <motion.p
          style={{ opacity: para1Opacity }}
          className="max-w-xl font-sans text-base leading-relaxed text-text-secondary/90 sm:text-lg"
        >
          {para1}
        </motion.p>

        <motion.p
          style={{ opacity: para2Opacity }}
          className="max-w-xl font-sans text-base leading-relaxed text-text-secondary/90 sm:text-lg"
        >
          {para2}
        </motion.p>

        <motion.div style={{ opacity: ctaOpacity }} className="mt-2 sm:mt-4">
          <Link href={SCROLL_VALUE_BLOCK.ctaHref}>
            <Button variant="light" size="lg">
              {SCROLL_VALUE_BLOCK.ctaLabel} &rarr;
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function FixedScrollProgressBar({ progress }: { progress: MotionValue<number> }) {
  const fillWidth = useTransform(progress, [0, 1], ["0%", "100%"]);
  const barOpacity = useTransform(
    progress,
    [0, 0.02, 0.98, 1],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ opacity: barOpacity }}
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 h-0.5 bg-white/10"
      aria-hidden
    >
      <motion.div className="h-full bg-accent" style={{ width: fillWidth }} />
    </motion.div>
  );
}

function ScrollStoryWash({ progress }: { progress: MotionValue<number> }) {
  const { start } = segmentRange(VALUE_INDEX);
  const washOpacity = useTransform(
    progress,
    [start - 0.02, start + 0.06, 0.985, 1],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ opacity: washOpacity }}
      className="scroll-story-wash pointer-events-none absolute inset-0"
      aria-hidden
    />
  );
}

export default function ScrollRevealText() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      style={{ height: `${TOTAL_VH}vh` }}
      className="relative"
      aria-label="Our story"
    >
      <FixedScrollProgressBar progress={scrollYProgress} />

      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <ScrollStoryWash progress={scrollYProgress} />

        <div className="relative z-[1] mx-auto h-[min(65vh,34rem)] w-full max-w-3xl px-6 lg:px-8">
          {STORY_PARAGRAPHS.map((text, i) => (
            <StoryLine key={text} text={text} index={i} progress={scrollYProgress} />
          ))}
          <ValueBlock progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}
