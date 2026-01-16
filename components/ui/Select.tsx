import { cn } from "@/lib/cn";
import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, id, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs text-gc-gray-500 mb-2"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "h-11 w-full bg-gc-white border border-gc-gray-300 px-3 text-sm text-gc-text rounded",
            "outline-none focus:ring-2 focus:ring-gc-yellow/50",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Select.displayName = "Select";
