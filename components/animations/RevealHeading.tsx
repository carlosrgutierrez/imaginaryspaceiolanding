"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import VerticalCutReveal, { VerticalCutRevealRef } from "./VerticalCutReveal";

interface RevealHeadingProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
  staggerDuration?: number;
  /** Fire on mount — use for above-fold headings */
  animate?: boolean;
}

export default function RevealHeading({
  children,
  className,
  delay = 0,
  as: Tag = "h2",
  staggerDuration = 0.08,
  animate: onMount = false,
}: RevealHeadingProps) {
  const vcRef = useRef<VerticalCutRevealRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const inView = useInView(containerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (onMount) {
      const t = setTimeout(() => vcRef.current?.startAnimation(), delay * 1000);
      return () => clearTimeout(t);
    }
  }, [onMount, delay]);

  useEffect(() => {
    if (inView && !onMount) {
      const t = setTimeout(() => vcRef.current?.startAnimation(), delay * 1000);
      return () => clearTimeout(t);
    }
  }, [inView, onMount, delay]);

  return (
    <div ref={containerRef}>
      <Tag className={cn("block", className)}>
        <VerticalCutReveal
          ref={vcRef}
          autoStart={false}
          splitBy="lines"
          staggerDuration={staggerDuration}
          transition={{ type: "spring", stiffness: 160, damping: 22 }}
        >
          {children}
        </VerticalCutReveal>
      </Tag>
    </div>
  );
}
