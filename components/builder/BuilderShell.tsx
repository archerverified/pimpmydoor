"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BuilderHeader } from "./BuilderHeader";
import { BuilderProgress } from "./BuilderProgress";
import { SelectionsSummary } from "./SelectionsSummary";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Step = "setup" | "design" | "track-options" | "extras";

interface BuilderShellProps {
  activeStep: Step;
  bottomBarText: string;
  children: React.ReactNode;
}

export function BuilderShell({
  activeStep,
  bottomBarText,
  children,
}: BuilderShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    // Fallback mapping
    const fallbackMap: Record<string, string> = {
      "/door-builder/design/color": "/door-builder/design/style",
      "/door-builder/design/style": "/door-builder/design/collection",
      "/door-builder/design/collection": "/door-builder/setup/select-size",
      "/door-builder/design": "/door-builder/setup/select-size",
      "/door-builder/track-options/windload": "/door-builder/track-options/lift",
      "/door-builder/track-options/lift": "/door-builder/track-options/springs",
      "/door-builder/track-options/springs": "/door-builder/design/color",
      "/door-builder/track-options": "/door-builder/design/color",
      "/door-builder/extras/hardware": "/door-builder/extras/insulation",
      "/door-builder/extras/insulation": "/door-builder/extras/windows",
      "/door-builder/extras/windows": "/door-builder/track-options/windload",
      "/door-builder/extras": "/door-builder/track-options/windload",
      "/door-builder/summary": "/door-builder/extras/hardware",
    };

    // Check for track-options/* pattern
    if (pathname.startsWith("/door-builder/track-options/")) {
      const fallback = fallbackMap[pathname] || "/door-builder/design/color";
      router.push(fallback);
      return;
    }

    const fallback = fallbackMap[pathname];
    if (fallback) {
      router.push(fallback);
    }
  };

  const showBack = pathname?.startsWith("/door-builder") ?? false;

  return (
    <div className="min-h-screen bg-gc-black px-6 py-6">
      {/* Inner Canvas */}
      <div className="max-w-[1400px] mx-auto bg-gc-white">
        {/* Header */}
        <BuilderHeader />

        {/* Progress Bar */}
        <BuilderProgress activeStep={activeStep} />

        {/* Introductory Text */}
        <div className="px-8 pb-4 text-center">
          <p className="text-base text-gc-text mb-1">
            Customize your Garage Door. Purchase Online or Send Yourself a Quote.
          </p>
          <p className="text-base text-gc-text mb-4">
            FREE DIY Delivery right to your home or business
          </p>
          
          {/* Rules */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-[85%] h-px bg-gc-yellow" />
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-gc-bg">
          <div className="max-w-[1100px] mx-auto py-10 md:py-14 px-4 md:px-10">
            {showBack && (
              <div className="mb-6">
                <button
                  type="button"
                  onClick={handleBack}
                  aria-label="Go back"
                  className={cn(
                    "inline-flex items-center gap-2",
                    "text-sm font-semibold",
                    "text-gc-gray-500 hover:text-gc-text hover:underline",
                    "transition-colors"
                  )}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </div>
            )}
            {showBack && (
              <div className="mb-6">
                <SelectionsSummary />
              </div>
            )}
            {children}
          </div>
        </div>

        {/* Bottom Gold Bar */}
        <div className="bg-gc-yellow w-full py-4">
          <p className="text-center text-gc-white font-semibold uppercase text-sm tracking-wide">
            {bottomBarText}
          </p>
        </div>
      </div>
    </div>
  );
}
