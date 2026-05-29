"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function TextReveal({ children, className }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.4"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.12, 1]);

  return (
    <motion.div ref={ref} style={{ opacity }} className={cn(className)}>
      {children}
    </motion.div>
  );
}
