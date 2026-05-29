import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-block font-sans text-accent-grad text-[11px] font-semibold uppercase tracking-[0.22em]",
        className
      )}
    >
      {children}
    </span>
  );
}
