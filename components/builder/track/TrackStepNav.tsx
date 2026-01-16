"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const steps = [
  { id: "springs", label: "Springs", href: "/door-builder/track-options/springs" },
  { id: "lift", label: "Lift", href: "/door-builder/track-options/lift" },
  { id: "windload", label: "Wind Load", href: "/door-builder/track-options/windload" },
];

export function TrackStepNav() {
  const pathname = usePathname();
  const currentStep = steps.find((step) => pathname === step.href)?.id || "springs";

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
