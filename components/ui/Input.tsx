import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const inputBase =
  "w-full bg-bg-card border border-white/10 rounded-lg px-4 py-3 font-sans text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 transition-colors";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="font-sans text-[11px] font-medium text-text-muted uppercase tracking-[0.12em]"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(inputBase, className)}
        {...props}
      />
      {error && (
        <span role="alert" className="font-sans text-xs text-red-400">
          {error}
        </span>
      )}
    </div>
  )
);
Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="font-sans text-[11px] font-medium text-text-muted uppercase tracking-[0.12em]"
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        className={cn(inputBase, "resize-none min-h-[120px]", className)}
        {...props}
      />
      {error && (
        <span role="alert" className="font-sans text-xs text-red-400">
          {error}
        </span>
      )}
    </div>
  )
);
Textarea.displayName = "Textarea";

export default Input;
