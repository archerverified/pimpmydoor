"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const steps = [
  { id: "collection", label: "Collection", href: "/door-builder/design/collection" },
  { id: "style", label: "Style", href: "/door-builder/design/style" },
  { id: "color", label: "Color", href: "/door-builder/design/color" },
];

export function DesignStepNav() {
  const pathname = usePathname();
  const currentStep = steps.find((step) => pathname === step.href)?.id || "collection";

  return (
    <nav className="mb-8">
      <ul className="space-y-2">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          return (
            <li key={step.id}>
              {isActive ? (
                <span
                  className={cn(
                    "block px-4 py-2 rounded text-sm font-medium",
                    "bg-gc-yellow text-gc-black"
                  )}
                >
                  {step.label}
                </span>
              ) : (
                <Link
                  href={step.href}
                  className={cn(
                    "block px-4 py-2 rounded text-sm font-medium",
                    "text-gc-gray-500 hover:bg-gc-bg hover:text-gc-text transition-colors"
                  )}
                >
                  {step.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
