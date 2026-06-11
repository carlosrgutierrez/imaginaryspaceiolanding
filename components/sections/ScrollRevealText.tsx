"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";
import Button from "@/components/ui/Button";
import { SCROLL_VALUE_BLOCK, STORY_PARAGRAPHS } from "@/lib/constants";

/* ── Pixel cover: full-screen blocks that turn on from bottom→up ──────── */
const COVER_CELL = 7;
const COVER_PX = 5;

function PixelCover({ progress }: { progress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sortedRef = useRef<{ idx: number; threshold: number }[]>([]);
  const drawnRef = useRef(0); // how many cells have been drawn so far
  const dimsRef = useRef({ cols: 0, rows: 0, cw: 0, ch: 0 });
  const imgRef = useRef<ImageData | null>(null);

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    const cols = Math.ceil(w / COVER_CELL);
    const rows = Math.ceil(h / COVER_CELL);
    const cw = cols * COVER_CELL;
    const ch = rows * COVER_CELL;
    canvas.width = cw;
    canvas.height = ch;
    dimsRef.current = { cols, rows, cw, ch };

    // Build cells sorted by threshold (lowest first = drawn earliest)
    const cells: { idx: number; threshold: number }[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        const rowNorm = 1 - r / (rows - 1);
        const jitter = (Math.sin(c * 7.3 + r * 13.1) * 0.5 + 0.5) * 0.12;
        cells.push({ idx, threshold: rowNorm * 0.88 + jitter });
      }
    }
    cells.sort((a, b) => a.threshold - b.threshold);
    sortedRef.current = cells;
    drawnRef.current = 0;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      imgRef.current = ctx.createImageData(cw, ch);
    }
  }, []);

  // Only draw newly visible cells when progress changes
  useMotionValueEvent(progress, "change", (p) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const sorted = sortedRef.current;
    const img = imgRef.current;
    const { cols, cw } = dimsRef.current;
    if (!img || sorted.length === 0) return;

    if (p <= 0) {
      if (drawnRef.current > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        imgRef.current = ctx.createImageData(cw, dimsRef.current.ch);
        drawnRef.current = 0;
      }
      return;
    }

    const d = img.data;
    const pad = (COVER_CELL - COVER_PX) >> 1;
    let changed = false;

    // Draw any cells whose threshold we've now passed
    while (drawnRef.current < sorted.length && sorted[drawnRef.current].threshold <= p) {
      const { idx } = sorted[drawnRef.current];
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const sx = col * COVER_CELL + pad;
      const sy = row * COVER_CELL + pad;
      for (let py = sy; py < sy + COVER_PX; py++) {
        const off = py * cw * 4 + sx * 4;
        for (let px = 0; px < COVER_PX; px++) {
          const o = off + px * 4;
          d[o] = 10; d[o + 1] = 10; d[o + 2] = 10; d[o + 3] = 255;
        }
      }
      drawnRef.current++;
      changed = true;
    }

    if (changed) ctx.putImageData(img, 0, 0);
  });

  useEffect(() => {
    setup();
    const onResize = () => setup();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setup]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
    />
  );
}

const PARA_COUNT = STORY_PARAGRAPHS.length;
// Compress color transitions to finish by 55% of total scroll — leaves room for cover
const SCROLL_END = 0.55;
const PARA_SHARE = SCROLL_END / PARA_COUNT;
// Keep fade within each segment so scroll keyframes stay monotonic
const FADE = Math.min(0.04, PARA_SHARE * 0.2);

function useParagraphColor(progress: MotionValue<number>, index: number) {
  const start = index * PARA_SHARE;
  const end = start + PARA_SHARE;
  const isLast = index === PARA_COUNT - 1;

  if (isLast) {
    return useTransform(
      progress,
      [start, start + FADE * 2],
      ["rgba(255,255,255,0.18)", "rgba(255,255,255,1)"]
    );
  }

  return useTransform(
    progress,
    [start, start + FADE, end - FADE, end],
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
      className="text-balance text-center font-sans text-lg font-normal leading-snug sm:text-2xl lg:text-3xl"
    >
      {text}
    </motion.p>
  );
}

/* (old clip-path blocks removed — replaced by PixelTransition) */

/* ── Ambient pixel grid (dense, oval band surrounding text) ──────────── */
const CELL = 7;
const PX_SIZE = 4;

function PixelGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<ImageData | null>(null);
  const stateRef = useRef<Float32Array | null>(null);
  const layerRef = useRef<Float32Array | null>(null);
  const eligibleRef = useRef<number[]>([]);
  const dimsRef = useRef({ cols: 0, rows: 0, cw: 0, ch: 0 });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const w = parent.clientWidth;
    const h = parent.clientHeight;
    const cols = Math.ceil(w / CELL);
    const rows = Math.ceil(h / CELL);
    const cw = cols * CELL;
    const ch = rows * CELL;

    canvas.width = cw;
    canvas.height = ch;
    dimsRef.current = { cols, rows, cw, ch };

    const total = cols * rows;
    const state = new Float32Array(total);
    const layers = new Float32Array(total);

    const cxPx = w / 2;
    const cyPx = h / 2;
    const cutW = w * 0.32;
    const cutH = h * 0.36;

    const BAND_COUNT = 6;
    const BAND_BRIGHTNESS = [0.12, 0.22, 0.38, 0.55, 0.72, 0.9];

    // Exclude top and bottom edge rows so pixels don't bleed into adjacent sections
    const edgeRowClear = Math.ceil(h * 0.06 / CELL);
    const eligible: number[] = [];
    for (let r = edgeRowClear; r < rows - edgeRowClear; r++) {
      for (let c = 0; c < cols; c++) {
        const px = (c + 0.5) * CELL;
        const py = (r + 0.5) * CELL;
        if (Math.abs(px - cxPx) < cutW && Math.abs(py - cyPx) < cutH) continue;
        const idx = r * cols + c;
        eligible.push(idx);
        const dx = (Math.abs(px - cxPx) - cutW) / (w * 0.5 - cutW);
        const dy = (Math.abs(py - cyPx) - cutH) / (h * 0.5 - cutH);
        const bandIdx = Math.min(BAND_COUNT - 1, Math.floor(Math.max(0, Math.max(dx, dy)) * BAND_COUNT));
        const bandBase = BAND_BRIGHTNESS[bandIdx];
        layers[idx] = bandBase;
        state[idx] = bandBase * (0.7 + Math.random() * 0.6);
      }
    }

    // Pre-render into ImageData
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = ctx.createImageData(cw, ch);
    const d = img.data;
    const pad = (CELL - PX_SIZE) >> 1;
    for (let i = 0; i < total; i++) {
      if (state[i] <= 0) continue;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const sx = col * CELL + pad;
      const sy = row * CELL + pad;
      const v = Math.round(state[i] * 0.18 * 255);
      for (let py = sy; py < sy + PX_SIZE; py++) {
        const off = py * cw * 4 + sx * 4;
        for (let px = 0; px < PX_SIZE; px++) {
          const o = off + px * 4;
          d[o] = 255; d[o + 1] = 255; d[o + 2] = 255; d[o + 3] = v;
        }
      }
    }
    ctx.putImageData(img, 0, 0);

    stateRef.current = state;
    layerRef.current = layers;
    imgRef.current = img;
    eligibleRef.current = eligible;
  }, []);

  const tick = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const state = stateRef.current;
    const layers = layerRef.current;
    const img = imgRef.current;
    const eligible = eligibleRef.current;
    const { cols, cw } = dimsRef.current;
    if (!state || !layers || !img || eligible.length === 0) return;

    const d = img.data;
    const pad = (CELL - PX_SIZE) >> 1;

    for (let k = 0; k < 20; k++) {
      const idx = eligible[Math.floor(Math.random() * eligible.length)];
      const bandBase = layers[idx];
      const oldVal = state[idx];

      if (Math.random() < 0.3) {
        state[idx] = Math.random() < 0.3 ? 0 : bandBase * (0.2 + Math.random() * 0.3);
      } else {
        state[idx] = bandBase * (0.6 + Math.random() * 0.8);
      }

      if (Math.abs(state[idx] - oldVal) < 0.02) continue;

      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const sx = col * CELL + pad;
      const sy = row * CELL + pad;
      const v = Math.round(state[idx] * 0.18 * 255);
      for (let py = sy; py < sy + PX_SIZE; py++) {
        const off = py * cw * 4 + sx * 4;
        for (let px = 0; px < PX_SIZE; px++) {
          const o = off + px * 4;
          d[o] = 255; d[o + 1] = 255; d[o + 2] = 255; d[o + 3] = v;
        }
      }
    }
    ctx.putImageData(img, 0, 0);
  }, []);

  useEffect(() => {
    setup();
    // ~15fps flicker instead of 60fps
    timerRef.current = setInterval(tick, 66);
    const onResize = () => setup();
    window.addEventListener("resize", onResize);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [setup, tick]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

export default function ScrollRevealText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const valueSectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [para1, para2] = SCROLL_VALUE_BLOCK.paragraphs;

  // Text drifts up slowly as scroll ends
  const contentY = useTransform(scrollYProgress, [0.4, 1], ["0%", "-15%"]);

  // Pixel cover: blocks turn on from bottom→up while value section slides over
  const coverProgress = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);

  return (
    <>
      {/* Scroll-reveal paragraphs */}
      <section
        ref={containerRef}
        style={{ height: `${PARA_COUNT * 55 + 60}vh` }}
        className="relative"
        aria-label="Our story"
      >
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <PixelGrid />
          <motion.div
            style={{ y: contentY }}
            className="relative z-10 mx-auto w-full max-w-3xl px-6 text-center lg:px-8"
          >
            <div className="flex flex-col items-center gap-5 sm:gap-8">
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
          <PixelCover progress={coverProgress} />
        </div>

      </section>

      {/* Value block — overlaps the pixel-covered scroll area */}
      <section
        ref={valueSectionRef}
        className="border-hatch-bottom relative z-30 -mt-[95vh] py-20 sm:py-28"
        style={{ background: "#0a0a0a" }}
      >
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
                {SCROLL_VALUE_BLOCK.headline}
              </motion.h2>
            </div>
          </motion.div>

          <p className="mt-6 font-sans text-base leading-relaxed text-text-secondary/70">
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
