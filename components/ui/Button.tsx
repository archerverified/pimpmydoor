import { cn } from "@/lib/cn";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "rounded-md h-10 px-8 text-sm font-semibold transition-opacity",
          variant === "primary" &&
            "bg-gc-yellow text-gc-white hover:opacity-90",
          variant === "ghost" && "bg-transparent text-gc-text hover:opacity-80",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
