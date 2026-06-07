"use client";

import { useRef, useEffect } from "react";

// Light → dark: space = transparent, @ = fully lit
const ASCII_RAMP = " .,:-=+*S#%@";

interface AsciiVideoProps {
  src: string;
  className?: string;
  cols?: number;
  color?: string;
}

export default function AsciiVideo({
  src,
  className,
  cols = 60,
  color = "rgba(96,165,250,0.85)",
}: AsciiVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sampleRef = useRef<HTMLCanvasElement>(null);
  const outputRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const taintedRef = useRef(false);
  const readyRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const sample = sampleRef.current;
    const output = outputRef.current;
    if (!video || !sample || !output) return;

    const FONT_SIZE = 7;
    // Courier New char aspect ratio: ~0.6 wide/tall
    const FONT_W = Math.round(FONT_SIZE * 0.6);
    const FONT_H = FONT_SIZE;

    const init = () => {
      if (readyRef.current) return;
      readyRef.current = true;

      const vw = video.videoWidth || 1;
      const vh = video.videoHeight || 1;
      const aspect = vw / vh;

      // rows derived from cols + video aspect ratio
      const rows = Math.round(cols / aspect / (FONT_W / FONT_H));

      sample.width = cols;
      sample.height = rows;

      // Output canvas matches video aspect ratio exactly
      output.width = cols * FONT_W;
      output.height = rows * FONT_H;

      const sCtx = sample.getContext("2d", { willReadFrequently: true });
      const oCtx = output.getContext("2d");
      if (!sCtx || !oCtx) return;

      oCtx.font = `${FONT_SIZE}px/1 "Courier New", monospace`;
      oCtx.textBaseline = "top";

      const render = () => {
        frameRef.current = requestAnimationFrame(render);
        if (taintedRef.current || video.readyState < 2) return;
        try {
          sCtx.drawImage(video, 0, 0, cols, rows);
          const { data } = sCtx.getImageData(0, 0, cols, rows);

          oCtx.clearRect(0, 0, output.width, output.height);
          oCtx.font = `${FONT_SIZE}px/1 "Courier New", monospace`;
          oCtx.textBaseline = "top";

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const off = (r * cols + c) * 4;
              const lum =
                (data[off] * 0.299 + data[off + 1] * 0.587 + data[off + 2] * 0.114) / 255;
              // Map luminance directly: bright pixel → bright/dense char
              const idx = Math.floor(lum * (ASCII_RAMP.length - 1));
              const ch = ASCII_RAMP[idx];
              if (ch === " ") continue;
              const alpha = 0.25 + lum * 0.75;
              oCtx.fillStyle = color.replace(/[\d.]+\)$/, `${alpha.toFixed(2)})`);
              oCtx.fillText(ch, c * FONT_W, r * FONT_H);
            }
          }
        } catch {
          taintedRef.current = true;
        }
      };

      video.play().catch(() => {});
      frameRef.current = requestAnimationFrame(render);
    };

    video.addEventListener("loadedmetadata", init, { once: true });
    if (video.readyState >= 1) init();

    return () => {
      cancelAnimationFrame(frameRef.current);
      video.removeEventListener("loadedmetadata", init);
    };
  }, [cols, color]);

  return (
    <div className={className}>
      <video
        ref={videoRef}
        src={src}
        crossOrigin="anonymous"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 1, height: 1 }}
      />
      <canvas ref={sampleRef} style={{ display: "none" }} />
      {/* canvas intrinsic size = video aspect ratio; CSS scales it to container */}
      <canvas
        ref={outputRef}
        className="h-full w-full"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
