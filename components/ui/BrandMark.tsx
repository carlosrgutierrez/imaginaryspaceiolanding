import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  size?: "sm" | "md";
  className?: string;
}

export default function BrandMark({ size = "md", className }: BrandMarkProps) {
  return (
    <div
      className={cn(
        "bg-accent-grad flex items-center justify-center shrink-0 rounded-[6px]",
        size === "sm" ? "w-6 h-6" : "w-7 h-7",
        className
      )}
    >
      <Image
        src="/assets/logo-dark.png"
        alt=""
        width={20}
        height={20}
        className="w-[70%] h-auto"
      />
    </div>
  );
}
