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

const PARA_COUNT = STORY_PARAGRAPHS.length;
const PARA_SHARE = 1 / PARA_COUNT;
const FADE = 0.08;

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

export default function ScrollRevealText() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [para1, para2] = SCROLL_VALUE_BLOCK.paragraphs;

  // As scroll nears the end, slide content upward so the cover section feels natural
  const contentY = useTransform(scrollYProgress, [0.75, 1], ["0%", "-12%"]);

  return (
    <>
      {/* Scroll-reveal paragraphs */}
      <section
        ref={containerRef}
        style={{ height: `${PARA_COUNT * 55}vh` }}
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
      <section className="relative z-10 -mt-[12vh] border-b border-white/8 bg-bg-primary py-20 sm:py-28">
        {/* Shadow at top edge to sell the cover effect */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
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
