import { cn } from "@/lib/utils";

interface BrandMarkProps {
  size?: "sm" | "md";
  className?: string;
}

export default function BrandMark({ size = "md", className }: BrandMarkProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "shrink-0 bg-accent-grad",
        size === "sm" ? "w-6 h-6" : "w-7 h-7",
        className
      )}
      style={{
        maskImage: "url(/assets/logo-dark.png)",
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: "url(/assets/logo-dark.png)",
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
