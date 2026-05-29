import Link from "next/link";
import BrandMark from "@/components/ui/BrandMark";

interface LogoProps {
  size?: "sm" | "md";
  showText?: boolean;
  onClick?: () => void;
}

export default function Logo({
  size = "md",
  showText = true,
  onClick,
}: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" onClick={onClick}>
      <BrandMark size={size} />
      {showText && (
        <span className="font-sans font-semibold text-sm tracking-[0.18em] text-text-primary uppercase">
          Imaginary Space
        </span>
      )}
    </Link>
  );
}
