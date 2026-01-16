import { cn } from "@/lib/cn";
import { SelectHTMLAttributes, forwardRef, ReactNode } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  placeholder?: string;
  children: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, id, placeholder, value, children, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const isEmpty = value === "" || value === undefined || value === null;

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
          value={value}
          className={cn(
            "h-11 w-full bg-gc-white border border-gc-gray-300 px-3 text-sm rounded",
            "outline-none focus:ring-2 focus:ring-gc-yellow/50",
            isEmpty ? "text-gc-gray-500" : "text-gc-text",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
      </div>
    );
  }
);

Select.displayName = "Select";
