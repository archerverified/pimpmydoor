"use client";

import { TrackStepNav } from "./TrackStepNav";
import { DesignPreview } from "@/components/builder/design/DesignPreview";

interface TrackLayoutProps {
  step: "springs" | "lift" | "windload";
  children: React.ReactNode;
}

export function TrackLayout({ step, children }: TrackLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10">
      {/* LEFT COLUMN - Configuration */}
      <div className="space-y-6">
        {/* Nav Box */}
        <div className="border border-gc-gray-300 bg-gc-white rounded-md p-6">
          {/* STEP Header */}
          <div className="mb-4">
            <div className="text-xs font-semibold tracking-widest text-gc-gray-500 mb-1">
              STEP 3
            </div>
            <div className="text-base font-semibold text-gc-text">
              Select track options.
            </div>
          </div>
          <TrackStepNav />
        </div>

        {/* Content Box */}
        <div className="border border-gc-gray-300 bg-gc-white rounded-md p-6">
          {children}
        </div>
      </div>

      {/* RIGHT COLUMN - Preview */}
      <DesignPreview />
    </div>
  );
}
