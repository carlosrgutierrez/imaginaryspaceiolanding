"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const BASE_DELAY = 0.8;

// Each layer's approximate visual center Y in SVG coordinates
const LAYER_CENTER_Y = [170, 140, 130, 120, 82, 52, 40];
const COLLAPSE_Y = 105;

function Layer({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
}) {
  const offsetY = COLLAPSE_Y - LAYER_CENTER_Y[index];

  return (
    <motion.g
      initial={{ transform: `translateY(${offsetY}px)` }}
      animate={{ transform: "translateY(0px)" }}
      transition={{ duration: 1.6, delay: BASE_DELAY + index * 0.08, ease: EASE }}
    >
      {children}
    </motion.g>
  );
}

export function IsoBrandMark({ className }: { className?: string }) {
  const TOTAL = 7;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="5 20 140 175"
      className={className}
      fill="none"
    >
      {/* Layer 0: Base grid / bottom plate */}
      <Layer index={0} total={TOTAL}>
        <polygon stroke="rgba(96,165,250,0.3)" fill="rgba(96,165,250,0.12)" strokeWidth="0.4" strokeLinejoin="round" points="44.3 157.3 44.3 163.4 83.8 186.2 123.4 164.6 123.4 157.1 83.8 179.3" />
        <polygon stroke="rgba(255,255,255,0.25)" fill="rgba(255,255,255,0.08)" strokeWidth="0.25" points="44.3 157.1 83.8 181.7 123.3 159.6 123.3 157.1 83.8 177.8" />
        <polygon stroke="rgba(255,255,255,0.3)" fill="rgba(255,255,255,0.12)" strokeWidth="0.25" strokeLinejoin="round" points="44.3 157.3 64.4 145 103.3 145 123.3 157.1 83.8 179.3" />
        <polyline stroke="rgba(255,255,255,0.12)" fill="none" strokeWidth="0.25" points="54.4 151.3 94 173.9 94 175.8" />
        <polyline stroke="rgba(255,255,255,0.12)" fill="none" strokeWidth="0.25" points="54.6 162.6 64.4 168.3 64.4 169.6" />
        <polyline stroke="rgba(255,255,255,0.12)" fill="none" strokeWidth="0.25" points="64.6 168.3 73.9 173.6 73.9 175.6" />
        <polyline stroke="rgba(255,255,255,0.12)" fill="none" strokeWidth="0.25" points="74.1 174.2 83.8 179.7 83.8 181.7" />
        <polyline stroke="rgba(255,255,255,0.12)" fill="none" strokeWidth="0.25" points="93.9 151 113.2 162.1 113.2 164.1" />
        <polyline stroke="rgba(255,255,255,0.12)" fill="none" strokeWidth="0.25" points="103.5 157.3 113.2 162.9 113.3 164.5" />
      </Layer>

      {/* Layer 1: Bottom board */}
      <Layer index={1} total={TOTAL}>
        <path stroke="rgba(255,255,255,0.3)" fill="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeLinejoin="round" d="m73.9 145.4v5.2l9.7 5.8c0.4 0.2 0.8 0.2 1.5 0l58.8-35.3v-5.2l-9-6.2c-0.5-0.3-1.8-0.3-2.8 0.2l-56.5 32.8c-0.5 0.7-1.5 2.2-1.7 2.7z" />
        <path stroke="rgba(255,255,255,0.2)" fill="rgba(255,255,255,0.1)" strokeWidth="0.25" d="m74.4 145.4 9.6 6 24.6-14.4v-2.9l-9.2-5.7-15 9-8.3 4.7z" />
        <path stroke="rgba(255,255,255,0.2)" fill="rgba(255,255,255,0.1)" strokeWidth="0.25" d="m112.1 122.4 6.8 4 17.7-10.5c0.5-0.3 0.5-0.8 0-0.9l-4.5-3.1c-0.2-0.3-0.7-0.3-1 0l-18.7 10.2c-0.5 0-0.5 0-0.3 0.3z" />
        <polygon stroke="rgba(96,165,250,0.4)" fill="rgba(96,165,250,0.15)" strokeWidth="0.25" points="87.9 151.1 91.1 149.1 91.1 150.6 87.9 152.4" />
        <polygon stroke="rgba(96,165,250,0.4)" fill="rgba(96,165,250,0.15)" strokeWidth="0.25" points="137.9 120.6 141.4 119.1 141.4 120.6 137.9 122.6" />
      </Layer>

      {/* Layer 2: Middle board */}
      <Layer index={2} total={TOTAL}>
        <path stroke="rgba(255,255,255,0.3)" fill="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeLinejoin="round" d="m59.4 136.4v4.8l9 5.2c0.3 0.2 0.8 0.2 1.5 0l53.7-31.5v-6.3l-8.2-5c-0.5-0.2-1.8-0.2-2.8 0.3l-51.5 30.1c-0.5 0.6-1.5 1.9-1.7 2.4z" />
        <path stroke="rgba(255,255,255,0.2)" fill="rgba(255,255,255,0.1)" strokeWidth="0.25" d="m59.6 136.4 9.3 5.3 23.5-13.7v-2.8l-9.3-4-14.2 8.2-7.3 4z" />
        <path stroke="rgba(255,255,255,0.2)" fill="rgba(255,255,255,0.1)" strokeWidth="0.25" d="m95.1 115.4 5.5 3.2 16.5-10c0.5-0.2 0.5-0.7 0-0.9l-4-2.3c-0.2-0.2-0.7-0.2-1 0l-17 9.6c-0.5 0.2-0.5 0.2 0 0.4z" />
        <polygon stroke="rgba(96,165,250,0.4)" fill="rgba(96,165,250,0.15)" strokeWidth="0.25" points="72.4 141.7 75.4 139.6 75.4 141.4 72.4 143.1" />
        <polygon stroke="rgba(96,165,250,0.4)" fill="rgba(96,165,250,0.15)" strokeWidth="0.25" points="118.1 113.9 121.4 112.4 121.4 113.7 118.1 115.6" />
      </Layer>

      {/* Layer 3: Top board */}
      <Layer index={3} total={TOTAL}>
        <path stroke="rgba(255,255,255,0.3)" fill="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeLinejoin="round" d="m44.3 127.9v4.4l9.1 5.3c0.3 0.2 0.9 0.2 1.6-0.1l53.6-31.5v-5.4l-8.1-5.2c-0.6-0.3-1.9-0.4-2.8 0.2l-51.5 30.2c-0.6 0.5-1.6 1.7-1.9 2.1z" />
        <path stroke="rgba(255,255,255,0.2)" fill="rgba(255,255,255,0.1)" strokeWidth="0.25" d="m44.4 127.9 10 5.4 32.9-18.7v-2.2l-9.4-5.4-9.5 6-13.8 8.1z" />
        <path stroke="rgba(255,255,255,0.2)" fill="rgba(255,255,255,0.1)" strokeWidth="0.25" d="m79.9 107 6 3.4 16.6-10.1c0.4-0.2 0.4-0.6 0-0.8l-3.9-2.4c-0.3-0.2-0.7-0.2-1.1 0l-17.1 9.5c-0.5 0.1-0.5 0.3-0.5 0.4z" />
        <polygon stroke="rgba(96,165,250,0.4)" fill="rgba(96,165,250,0.15)" strokeWidth="0.25" points="57.6 132.6 60.6 131.1 60.6 132.4 57.6 134" />
        <polygon stroke="rgba(96,165,250,0.4)" fill="rgba(96,165,250,0.15)" strokeWidth="0.25" points="103.6 105.4 106.6 103.7 106.6 105 103.6 106.7" />
      </Layer>

      {/* Layer 4: Main platform with chip blocks */}
      <Layer index={4} total={TOTAL}>
        <polygon stroke="rgba(255,255,255,0.35)" fill="rgba(255,255,255,0.12)" strokeWidth="0.25" points="34.5 89.8 60.2 105.2 109 75.6 83.8 59.7" />
        <polygon stroke="rgba(96,165,250,0.4)" fill="rgba(96,165,250,0.15)" strokeWidth="0.25" points="34.5 91.8 60.2 107 108.9 77.9 108.9 79.9 60.2 107.4 34.5 93.7" />
        <polygon stroke="rgba(255,255,255,0.3)" fill="rgba(255,255,255,0.1)" strokeWidth="0.25" points="34.5 89.8 34.5 94.4 60.2 109.3 60.2 105.2" />

        {/* Chip block 1 */}
        <polygon stroke="rgba(255,255,255,0.25)" fill="rgba(255,255,255,0.1)" strokeWidth="0.25" points="40.1 88.6 47.4 84.5 54.7 88.6 47.3 93.6" />
        <polygon stroke="rgba(96,165,250,0.35)" fill="rgba(96,165,250,0.18)" strokeWidth="0.25" points="41 88.6 44.2 86.9 46.8 88.6 44.3 90.5" />
        <polygon stroke="rgba(96,165,250,0.35)" fill="rgba(96,165,250,0.18)" strokeWidth="0.25" points="44.9 86.6 47.4 84.9 50.3 86.6 47.5 88.3" />
        <polygon stroke="rgba(96,165,250,0.35)" fill="rgba(96,165,250,0.18)" strokeWidth="0.25" points="44.8 90.5 47.3 89 50.3 90.5 47.5 92.1" />
        <polygon stroke="rgba(96,165,250,0.35)" fill="rgba(96,165,250,0.18)" strokeWidth="0.25" points="48.1 88.6 50.6 87.1 53.6 88.6 51 90.2" />

        {/* Chip block 2 */}
        <polygon stroke="rgba(255,255,255,0.25)" fill="rgba(255,255,255,0.1)" strokeWidth="0.25" points="53.1 96.7 60.4 92.6 67.4 96.7 60.5 101.6" />
        <polygon stroke="rgba(96,165,250,0.35)" fill="rgba(96,165,250,0.18)" strokeWidth="0.25" points="54.2 96.6 57.3 94.9 59.9 96.6 57.2 98.3" />
        <polygon stroke="rgba(96,165,250,0.35)" fill="rgba(96,165,250,0.18)" strokeWidth="0.25" points="57.9 95.1 60.4 93.4 63.1 95.1 60.4 96.6" />
        <polygon stroke="rgba(96,165,250,0.35)" fill="rgba(96,165,250,0.18)" strokeWidth="0.25" points="57.7 98.5 60.2 97 63.2 98.5 60.5 100.1" />
        <polygon stroke="rgba(96,165,250,0.35)" fill="rgba(96,165,250,0.18)" strokeWidth="0.25" points="61.1 96.6 63.6 95.1 66.6 96.6 63.9 98.2" />

        {/* Chip block 3 */}
        <polygon stroke="rgba(255,255,255,0.25)" fill="rgba(255,255,255,0.1)" strokeWidth="0.25" points="76.6 65.8 83.9 61.8 91.2 66 83.8 71.5" />
        <polygon stroke="rgba(96,165,250,0.35)" fill="rgba(96,165,250,0.18)" strokeWidth="0.25" points="77.8 65.8 80.9 64 83.5 65.8 80.8 67.4" />
        <polygon stroke="rgba(96,165,250,0.35)" fill="rgba(96,165,250,0.18)" strokeWidth="0.25" points="81.3 64 83.8 62.2 86.5 64 83.8 65.6" />
        <polygon stroke="rgba(96,165,250,0.35)" fill="rgba(96,165,250,0.18)" strokeWidth="0.25" points="81.1 67.6 83.6 66 86.6 67.6 83.9 69.2" />
        <polygon stroke="rgba(96,165,250,0.35)" fill="rgba(96,165,250,0.18)" strokeWidth="0.25" points="84.5 65.8 87 64 90 65.8 87.3 67.4" />

        {/* Chip block 4 */}
        <polygon stroke="rgba(255,255,255,0.25)" fill="rgba(255,255,255,0.1)" strokeWidth="0.25" points="89.6 74.7 96.9 70.2 103.8 75.2 96.8 80" />
        <polygon stroke="rgba(96,165,250,0.35)" fill="rgba(96,165,250,0.18)" strokeWidth="0.25" points="90.7 74.7 93.8 73 96.4 74.7 93.7 76.4" />
        <polygon stroke="rgba(96,165,250,0.35)" fill="rgba(96,165,250,0.18)" strokeWidth="0.25" points="94.2 72.7 96.9 71.2 99.6 72.7 96.9 74.2" />
        <polygon stroke="rgba(96,165,250,0.35)" fill="rgba(96,165,250,0.18)" strokeWidth="0.25" points="94.2 76.6 96.7 75 99.7 76.6 96.9 78.2" />
        <polygon stroke="rgba(96,165,250,0.35)" fill="rgba(96,165,250,0.18)" strokeWidth="0.25" points="97.5 74.7 100 73.2 103 74.7 100.3 76.4" />

        {/* Cylinder */}
        <ellipse stroke="rgba(255,255,255,0.25)" fill="rgba(255,255,255,0.08)" strokeWidth="0.25" cx="72.4" cy="81.4" rx="6.9" ry="3.7" />
        <ellipse stroke="rgba(255,255,255,0.2)" fill="rgba(255,255,255,0.1)" strokeWidth="0.25" cx="72.4" cy="81.1" rx="6.4" ry="3.5" />
        <ellipse stroke="rgba(96,165,250,0.4)" fill="rgba(96,165,250,0.12)" strokeWidth="0.25" cx="72.2" cy="81.2" rx="4.2" ry="2.1" />
      </Layer>

      {/* Layer 5: Top component body */}
      <Layer index={5} total={TOTAL}>
        <path stroke="rgba(255,255,255,0.25)" fill="rgba(255,255,255,0.08)" strokeWidth="0.25" d="m86.8 36.8-24-13.9-18.4 10.6-1.3-0.2-1.4 0.1-12.7 7.3h-0.1 0.1l-0.7 0.4-0.3 0.2-1 1.3-17.5 10.8 0.2 0.7 24.3 13.9 17.9-10 1.1-0.2 2.3 0.7 13.1-7.5 0.1-2.6 17.6-10.4 0.2-0.5z" />
        <polygon stroke="rgba(255,255,255,0.25)" fill="rgba(255,255,255,0.12)" strokeWidth="0.25" points="35.8 45.4 49.7 37 63.5 45.4 49.6 54.9" />
        <polygon stroke="rgba(255,255,255,0.15)" fill="rgba(255,255,255,0.08)" strokeWidth="0.25" points="40.1 44.4 47.9 39.6 51 39.7 59 44.4 59 46.3 51.1 51 47.9 51 40.1 46.5" />
        <polygon stroke="rgba(255,255,255,0.2)" fill="rgba(255,255,255,0.08)" strokeWidth="0.25" points="35.8 45.4 35.8 47 49.6 54.9 49.7 53.4" />
        <polygon stroke="rgba(255,255,255,0.2)" fill="rgba(255,255,255,0.08)" strokeWidth="0.25" points="49.7 53.4 63.5 45.4 63.5 46.9 49.6 55" />
        <path stroke="rgba(96,165,250,0.45)" fill="rgba(96,165,250,0.18)" strokeWidth="0.25" d="m89.2 43.7-18.1 10 0.2 2.1 17.2-10 2-4 0.2-3.2z" />
        <path stroke="rgba(96,165,250,0.45)" fill="rgba(96,165,250,0.18)" strokeWidth="0.25" d="m7.9 66.9 16.2 10.3v2.1l-16.6-10 0.4-2.4z" />
        <path stroke="rgba(96,165,250,0.45)" fill="rgba(96,165,250,0.18)" strokeWidth="0.25" d="m27.5 76.3 6 0.3 18-11.6v2.4l-17.8 10.8-6.3-0.1" />
        <path stroke="rgba(96,165,250,0.45)" fill="rgba(96,165,250,0.18)" strokeWidth="0.25" d="m8 67 16.1 10.2v1.8l-16.1-9.8z" />
      </Layer>

      {/* Layer 6: Top shell / cover */}
      <Layer index={6} total={TOTAL}>
        <path stroke="rgba(96,165,250,0.4)" fill="rgba(255,255,255,0.06)" strokeWidth="0.5" strokeLinejoin="round" d="m89 34-18.5-10.7-6.5-1.3h-2.4l-18.1 11-1.8 0.4-12.7 7.3s-1 0.6-1 1h0.5l-0.5 0.7-19.3 10.6c-1.1 0.6-1.2 2-1.2 2l-0.5 0.6c-0.4 0.2-0.5 12.6-0.1 13.1l18.5 10.7c0.2 0.5 7.9 1.6 8.8 1.6l1-0.4 18.4-10.6 1-1 1.7-0.2 3-1.3 9.3-6 0.7-1 0.2-0.9 0.7-0.8 18.3-10.4 0.5-0.6 1.5-4.4v-4.8l-1.1-4.1-0.4-0.5z" />
      </Layer>
    </svg>
  );
}
