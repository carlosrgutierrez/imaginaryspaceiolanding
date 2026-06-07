"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
const Spline = dynamic(
  () => import("@splinetool/react-spline/next").then(m => ({ default: m.default })),
  { ssr: false, loading: () => null }
);
import HeroClientLogos from "@/components/sections/HeroClientLogos";
import Button from "@/components/ui/Button";
import {
  HERO_CLIENTS,
  HERO_SUBTITLE,
} from "@/lib/constants";

const EASE = [0.22, 1, 0.36, 1] as const;
const MARK = 8;
const MC = "rgba(255,255,255,0.25)";
const GLITCH_PIXELS = [
  // Left edge — % from left, scattered vertically in the divider strip
  { side: "left" as const, x: 0,   y: 0,  s: 6, o: 0.08 },
  { side: "left" as const, x: 0.5, y: 30, s: 8, o: 0.06 },
  { side: "left" as const, x: 1.5, y: 10, s: 5, o: 0.07 },
  { side: "left" as const, x: 0,   y: 55, s: 6, o: 0.05 },
  { side: "left" as const, x: 2.5, y: 40, s: 4, o: 0.06 },
  { side: "left" as const, x: 1,   y: 75, s: 5, o: 0.04 },
  { side: "left" as const, x: 3.5, y: 20, s: 3, o: 0.05 },
  { side: "left" as const, x: 0.5, y: 90, s: 4, o: 0.03 },
  // Right edge — % from right
  { side: "right" as const, x: 0,   y: 5,  s: 7, o: 0.08 },
  { side: "right" as const, x: 0.5, y: 35, s: 6, o: 0.06 },
  { side: "right" as const, x: 1.5, y: 15, s: 5, o: 0.07 },
  { side: "right" as const, x: 0,   y: 60, s: 8, o: 0.05 },
  { side: "right" as const, x: 2.5, y: 45, s: 4, o: 0.06 },
  { side: "right" as const, x: 1,   y: 80, s: 5, o: 0.04 },
  { side: "right" as const, x: 3,   y: 25, s: 3, o: 0.05 },
  { side: "right" as const, x: 0.5, y: 95, s: 4, o: 0.03 },
];


function TickMark({ style, delay = 0 }: { style: React.CSSProperties; delay?: number }) {
  return (
    <motion.div
      className="pointer-events-none absolute z-20 hidden sm:block"
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    />
  );
}

function RightPanel() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            rgba(255,255,255,0.045) 0px,
            rgba(255,255,255,0.045) 0.5px,
            transparent 0.5px,
            transparent 6px
          )`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{
            width: "80%",
            height: "85%",
            background: "#0a0a0a",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.06)",
            borderRadius: "50%",
          }}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.6, ease: EASE }}
        />
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="h-full w-full scale-[1.28] origin-center">
          <Spline
            scene="https://prod.spline.design/M7LEIHvhbfJlZaO1/scene.splinecode"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-bg-primary pt-[4.5rem]">
      <div className="relative z-[1] mx-auto flex w-full max-w-screen-xl flex-1 flex-col px-6 lg:px-8">
        <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col">

          {/* ═══ Outer frame ═══ */}
          <div className="relative flex flex-1 flex-col border border-white/[0.08] sm:flex-row">

            {/* ── Tick marks: outer corners ── */}
            {/* TL */}
            <TickMark delay={1.1} style={{ top: -1, left: -1, width: MARK, height: 1, background: MC }} />
            <TickMark delay={1.1} style={{ top: -1, left: -1, width: 1, height: MARK, background: MC }} />
            {/* TR */}
            <TickMark delay={1.15} style={{ top: -1, right: -1, width: MARK, height: 1, background: MC }} />
            <TickMark delay={1.15} style={{ top: -1, right: -1, width: 1, height: MARK, background: MC }} />
            {/* BL */}
            <TickMark delay={1.2} style={{ bottom: -1, left: -1, width: MARK, height: 1, background: MC }} />
            <TickMark delay={1.2} style={{ bottom: -1, left: -1, width: 1, height: MARK, background: MC }} />
            {/* BR */}
            <TickMark delay={1.25} style={{ bottom: -1, right: -1, width: MARK, height: 1, background: MC }} />
            <TickMark delay={1.25} style={{ bottom: -1, right: -1, width: 1, height: MARK, background: MC }} />

            {/* ── Left: text ── */}
            <div className="relative flex flex-1 flex-col justify-between p-8 sm:min-h-[65vh] sm:border-r sm:border-white/[0.08] sm:p-12 lg:p-16">
              {/* ┬ top of divider */}
              <TickMark delay={1.3} style={{ top: -1, right: -1, width: 1, height: MARK, background: MC }} />
              <TickMark delay={1.3} style={{ top: -1, right: -(MARK / 2), width: MARK, height: 1, background: MC }} />
              {/* ┴ bottom of divider */}
              <TickMark delay={1.35} style={{ bottom: -1, right: -1, width: 1, height: MARK, background: MC }} />
              <TickMark delay={1.35} style={{ bottom: -1, right: -(MARK / 2), width: MARK, height: 1, background: MC }} />
              <div>
                <div>
                  {["We don\u2019t just talk AI.", "We deliver it."].map((line, i) => (
                    <div key={i} className="overflow-hidden">
                      <motion.p
                        className="font-serif text-[clamp(1.6rem,3.5vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.02em] text-text-primary"
                        initial={{ y: "120%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.9, delay: 0.15 + i * 0.15, ease: EASE }}
                      >
                        {line}
                      </motion.p>
                    </div>
                  ))}
                </div>

                <motion.p
                  className="mt-8 max-w-sm font-sans text-sm leading-[1.8] text-text-secondary/75 sm:text-[0.9rem]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
                >
                  {HERO_SUBTITLE}
                </motion.p>
              </div>

              <motion.div
                className="mt-12 flex items-center gap-5 sm:mt-auto"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease: EASE }}
              >
                <Link href="/work-with-us">
                  <Button variant="light" size="lg">
                    Get in touch
                  </Button>
                </Link>
                <Link
                  href="/services"
                  className="font-sans text-xs font-medium tracking-[0.08em] text-text-muted transition-colors hover:text-text-primary"
                >
                  Our process &rarr;
                </Link>
              </motion.div>
            </div>

            {/* ── Right: pattern + oval cutout ── */}
            <div className="relative hidden flex-1 overflow-hidden sm:block">
              <RightPanel />
            </div>
          </div>

          {/* ═══ Client logos strip ═══ */}
          <motion.div
            className="relative border-x border-b border-white/[0.08]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4, ease: EASE }}
          >
            {/* T ticks where hero frame bottom meets client strip top — left */}
            <TickMark delay={1.45} style={{ top: -1, left: -1, width: 1, height: MARK, background: MC }} />
            <TickMark delay={1.45} style={{ top: -1, left: -1, width: MARK, height: 1, background: MC }} />
            {/* T ticks — right */}
            <TickMark delay={1.48} style={{ top: -1, right: -1, width: 1, height: MARK, background: MC }} />
            <TickMark delay={1.48} style={{ top: -1, right: -1, width: MARK, height: 1, background: MC }} />
            {/* Bottom corners */}
            <TickMark delay={1.5} style={{ bottom: -1, left: -1, width: MARK, height: 1, background: MC }} />
            <TickMark delay={1.5} style={{ bottom: -1, left: -1, width: 1, height: MARK, background: MC }} />
            <TickMark delay={1.55} style={{ bottom: -1, right: -1, width: MARK, height: 1, background: MC }} />
            <TickMark delay={1.55} style={{ bottom: -1, right: -1, width: 1, height: MARK, background: MC }} />
            <div className="px-8 py-6 sm:px-12 sm:py-7 lg:px-16">
              <HeroClientLogos clients={HERO_CLIENTS} />
            </div>
          </motion.div>


        </div>
      </div>

      {/* Pixel glitch divider — scattered blocks on left and right at the seam */}
      <div className="pointer-events-none relative z-[3] hidden h-12 sm:block" aria-hidden>
        {GLITCH_PIXELS.map((px, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: px.s,
              height: px.s,
              left: px.side === "left" ? `${px.x}%` : undefined,
              right: px.side === "right" ? `${px.x}%` : undefined,
              top: `${px.y}%`,
              background: `rgba(255,255,255,${px.o})`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
