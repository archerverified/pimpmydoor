import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines clsx and tailwind-merge for conditional class name handling.
 * - clsx: Handles conditional classes, arrays, and objects
 * - twMerge: Intelligently merges Tailwind CSS classes, resolving conflicts
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-gc-yellow", className)
 * cn("text-gc-text", { "font-bold": isBold })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
