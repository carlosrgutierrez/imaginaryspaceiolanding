"use client";

import { useRef, useEffect } from "react";

interface Props {
  src: string;
  className?: string;
  /** 0–1 tint strength toward brand blue */
  tint?: number;
}

export default function MaskedIllustration({ src, className, tint = 0.0 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const d = imgData.data;

      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2];

        // Remove near-white pixels (white background)
        const brightness = (r + g + b) / 3;
        const isNearWhite = r > 235 && g > 235 && b > 235;
        if (isNearWhite) {
          // Fade alpha proportionally for anti-aliased edges
          const excess = Math.min(r, g, b) - 220;
          d[i + 3] = excess <= 0 ? 0 : Math.round((1 - excess / 35) * 255);
          continue;
        }

        // Optional: tint non-white pixels toward brand blue (96,165,250)
        if (tint > 0) {
          d[i]     = Math.round(r + (96  - r) * tint);
          d[i + 1] = Math.round(g + (165 - g) * tint);
          d[i + 2] = Math.round(b + (250 - b) * tint);
        }
      }

      ctx.putImageData(imgData, 0, 0);
    };

    img.src = src;
  }, [src, tint]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ imageRendering: "auto" }}
    />
  );
}
