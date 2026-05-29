import { cn } from "@/lib/utils";

interface AccentHighlightProps {
  children: React.ReactNode;
  className?: string;
}

export default function AccentHighlight({ children, className }: AccentHighlightProps) {
  return (
    <span
      className={cn(
        "bg-accent-grad text-bg-primary px-2 py-0.5 rounded-[4px] leading-none [box-decoration-break:clone] [-webkit-box-decoration-break:clone]",
        className
      )}
    >
      {children}
    </span>
  );
}
