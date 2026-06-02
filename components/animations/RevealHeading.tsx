"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealHeadingProps {
  lines: string[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
  /** Fire on mount — use for above-fold headings */
  animate?: boolean;
}

const container = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.12, delayChildren: delay },
  }),
};

const line = {
  hidden: { y: "105%" },
  visible: {
    y: "0%",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function RevealHeading({
  lines,
  className,
  delay = 0,
  as: Tag = "h2",
  animate: onMount = false,
}: RevealHeadingProps) {
  return (
    <motion.div
      variants={container}
      custom={delay}
      initial="hidden"
      {...(onMount
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once: true, amount: 0.3 } })}
    >
      <Tag className={cn("block", className)}>
        {lines.map((text, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span className="block" variants={line}>
              {text}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}
