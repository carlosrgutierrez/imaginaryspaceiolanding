"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  className?: string;
}

export default function FadeInView({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 30,
  className,
}: FadeInViewProps) {
  const offset =
    direction === "up"    ? { y: distance }  :
    direction === "down"  ? { y: -distance } :
    direction === "left"  ? { x: distance }  :  // starts right, slides left into position
    direction === "right" ? { x: -distance } :  // starts left, slides right into position
    {};

  /* Horizontal entries use spring physics for a weightier feel */
  const transition =
    direction === "left" || direction === "right"
      ? { type: "spring" as const, stiffness: 60, damping: 18, delay }
      : { duration, ease: [0.25, 0.46, 0.45, 0.94] as const, delay };

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={transition}
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}
