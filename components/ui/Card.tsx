"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLMotionProps<"div"> {
  hover?: boolean;
}

export default function Card({
  children,
  className,
  hover = true,
  ...props
}: CardProps) {
  return (
    <motion.div
      className={cn(
        "bg-bg-card border border-white/8 rounded-card overflow-hidden",
        className
      )}
      whileHover={
        hover ? { borderColor: "rgba(255,255,255,0.16)", y: -4 } : undefined
      }
      transition={{ duration: 0.2, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
