"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import VerticalCutReveal from "./VerticalCutReveal";

interface RevealHeadingProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
  staggerDuration?: number;
  animate?: boolean;
  nowrap?: boolean;
}

export default function RevealHeading({
  children,
  className,
  delay = 0,
  as: Tag = "h2",
  staggerDuration = 0.08,
  animate: onMount = false,
  nowrap = false,
}: RevealHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-30px 0px" });

  const shouldAnimate = onMount || inView;

  return (
    <div ref={containerRef}>
      <Tag className={cn("block", className)}>
        <VerticalCutReveal
          autoStart={shouldAnimate}
          splitBy="lines"
          staggerDuration={staggerDuration}
          containerClassName={cn(nowrap && "whitespace-nowrap")}
          transition={{ type: "spring", stiffness: 160, damping: 22, delay }}
        >
          {children}
        </VerticalCutReveal>
      </Tag>
    </div>
  );
}
