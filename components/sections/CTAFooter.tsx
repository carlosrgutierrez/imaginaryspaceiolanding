"use client";

import Link from "next/link";
import { useRef, useEffect, useCallback } from "react";
import FadeInView from "@/components/animations/FadeInView";
import Button from "@/components/ui/Button";
import { CTA_SECTION } from "@/lib/constants";

const LINE_TONE: Record<
  (typeof CTA_SECTION.lines)[number]["tone"],
  string
> = {
  primary: "text-text-primary",
  mid: "text-accent-light",
  accent: "text-accent",
};

/* ── Blue pixel grid for CTA background ──────────────────────────────── */
const CTA_CELL = 7;
const CTA_PX = 4;

function CTAPixelGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<ImageData | null>(null);
  const stateRef = useRef<Float32Array | null>(null);
  const eligibleRef = useRef<number[]>([]);
  const bandRef = useRef<Float32Array | null>(null);
  const dimsRef = useRef({ cols: 0, rows: 0, cw: 0, ch: 0 });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const w = parent.clientWidth;
    const h = parent.clientHeight;
    const cols = Math.ceil(w / CTA_CELL);
    const rows = Math.ceil(h / CTA_CELL);
    const cw = cols * CTA_CELL;
    const ch = rows * CTA_CELL;
    canvas.width = cw;
    canvas.height = ch;
    dimsRef.current = { cols, rows, cw, ch };

    const total = cols * rows;
    const state = new Float32Array(total);
    const bands = new Float32Array(total);
    const eligible: number[] = [];

    // Pixels only from the bottom — starts around 55% down, gets denser toward the bottom edge
    const startRow = Math.floor(rows * 0.55);
    const BAND_BRIGHTNESS = [0.06, 0.12, 0.22, 0.35, 0.5, 0.68, 0.85];
    const BAND_COUNT = BAND_BRIGHTNESS.length;

    for (let r = startRow; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = r * cols + c;
        eligible.push(idx);

        // 0 at startRow → 1 at bottom
        const depth = (r - startRow) / (rows - startRow);
        const bandIdx = Math.min(BAND_COUNT - 1, Math.floor(depth * BAND_COUNT));
        const bandBase = BAND_BRIGHTNESS[bandIdx];
        bands[idx] = bandBase;
        state[idx] = bandBase * (0.6 + Math.random() * 0.7);
      }
    }

    // Pre-render into ImageData
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = ctx.createImageData(cw, ch);
    const d = img.data;
    const pad = (CTA_CELL - CTA_PX) >> 1;

    for (let i = 0; i < total; i++) {
      if (state[i] <= 0) continue;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const sx = col * CTA_CELL + pad;
      const sy = row * CTA_CELL + pad;
      const a = Math.round(state[i] * 0.2 * 255);
      for (let py = sy; py < sy + CTA_PX; py++) {
        const off = py * cw * 4 + sx * 4;
        for (let px = 0; px < CTA_PX; px++) {
          const o = off + px * 4;
          // Blue tint: rgb(96, 165, 250) = brand accent
          d[o] = 96; d[o + 1] = 165; d[o + 2] = 250; d[o + 3] = a;
        }
      }
    }
    ctx.putImageData(img, 0, 0);

    stateRef.current = state;
    bandRef.current = bands;
    imgRef.current = img;
    eligibleRef.current = eligible;
  }, []);

  const tick = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const state = stateRef.current;
    const bands = bandRef.current;
    const img = imgRef.current;
    const eligible = eligibleRef.current;
    const { cols, cw } = dimsRef.current;
    if (!state || !bands || !img || eligible.length === 0) return;

    const d = img.data;
    const pad = (CTA_CELL - CTA_PX) >> 1;

    for (let k = 0; k < 18; k++) {
      const idx = eligible[Math.floor(Math.random() * eligible.length)];
      const bandBase = bands[idx];
      const oldVal = state[idx];

      if (Math.random() < 0.3) {
        state[idx] = Math.random() < 0.3 ? 0 : bandBase * (0.2 + Math.random() * 0.3);
      } else {
        state[idx] = bandBase * (0.5 + Math.random() * 0.9);
      }

      if (Math.abs(state[idx] - oldVal) < 0.02) continue;

      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const sx = col * CTA_CELL + pad;
      const sy = row * CTA_CELL + pad;
      const a = Math.round(state[idx] * 0.2 * 255);
      for (let py = sy; py < sy + CTA_PX; py++) {
        const off = py * cw * 4 + sx * 4;
        for (let px = 0; px < CTA_PX; px++) {
          const o = off + px * 4;
          d[o] = 96; d[o + 1] = 165; d[o + 2] = 250; d[o + 3] = a;
        }
      }
    }
    ctx.putImageData(img, 0, 0);
  }, []);

  useEffect(() => {
    setup();
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

export default function CTAFooter() {
  return (
    <section
      className="relative overflow-hidden py-32 lg:py-40"
      style={{ background: "#0a0a0a" }}
    >
      <CTAPixelGrid />
      <div className="relative z-10 mx-auto max-w-screen-xl px-6 text-center lg:px-8">
        <div className="mb-10 flex flex-col items-center gap-1 sm:gap-2">
          {CTA_SECTION.lines.map((line, i) => (
            <FadeInView
              key={line.text}
              delay={i * 0.1}
              duration={0.75}
              distance={32}
              className="w-full"
            >
              <p
                className={`font-serif text-3xl leading-[1.2] sm:text-4xl lg:text-[2.75rem] ${LINE_TONE[line.tone]}`}
              >
                {line.text}
              </p>
            </FadeInView>
          ))}
        </div>

        <FadeInView delay={0.28} duration={0.8} distance={32}>
          <Link href={CTA_SECTION.ctaHref}>
            <Button variant="light" size="lg">
              {CTA_SECTION.ctaLabel} &rarr;
            </Button>
          </Link>
        </FadeInView>
      </div>
    </section>
  );
}
