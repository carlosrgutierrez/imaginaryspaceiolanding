"use client";

import { useInView, useCountUp } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  className,
}: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.3);
  const count = useCountUp(target, duration, inView);

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
