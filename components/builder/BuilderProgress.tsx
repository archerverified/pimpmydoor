import { cn } from "@/lib/cn";
import Link from "next/link";

type Step = "setup" | "design" | "track-options" | "extras";

const steps: { id: Step; label: string; href: string }[] = [
  { id: "setup", label: "Setup", href: "/door-builder/setup/select-size" },
  { id: "design", label: "Design", href: "/door-builder/design" },
  { id: "track-options", label: "Track Options", href: "/door-builder/track-options" },
  { id: "extras", label: "Extras", href: "/door-builder/extras" },
];

interface BuilderProgressProps {
  activeStep: Step;
}

export function BuilderProgress({ activeStep }: BuilderProgressProps) {
  const activeIndex = steps.findIndex((step) => step.id === activeStep);

  return (
    <div className="px-8 pb-6">
      <div className="flex justify-between items-start mb-2">
        {steps.map((step, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={step.id}
              className="flex-1 flex flex-col items-center"
              style={{ maxWidth: "25%" }}
            >
              {isActive ? (
                <span
                  className={cn(
                    "text-sm font-medium mb-2",
                    "text-gc-text pointer-events-none cursor-default"
                  )}
                >
                  {step.label}
                </span>
              ) : (
                <Link
                  href={step.href}
                  className={cn(
                    "text-sm font-medium mb-2",
                    "text-gc-gray-500 hover:underline"
                  )}
                >
                  {step.label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex items-center">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              "h-1 flex-1",
              index <= activeIndex ? "bg-gc-yellow" : "bg-gc-black"
            )}
            style={{ maxWidth: "25%" }}
          />
        ))}
      </div>
    </div>
  );
}
