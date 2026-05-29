import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "solid" | "ghost";
  size?: "sm" | "md" | "lg";
}

const SIZE: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-5 py-2 text-[11px]",
  md: "px-7 py-2.5 text-[11px]",
  lg: "px-9 py-3.5 text-xs",
};

const VARIANT: Record<NonNullable<ButtonProps["variant"]>, string> = {
  outline:
    "border border-white/80 bg-transparent text-text-primary uppercase tracking-[0.14em] hover:bg-white hover:text-bg-primary",
  solid:
    "bg-accent-grad text-bg-primary uppercase tracking-[0.14em] hover:brightness-110",
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "outline", size = "md", className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-full cursor-pointer transition-all duration-200 select-none",
        SIZE[size],
        VARIANT[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";
export default Button;
