"use client";

import { DesignStepNav } from "./DesignStepNav";
import { DesignPreview } from "./DesignPreview";

interface DesignLayoutProps {
  step: "collection" | "style" | "color";
  children: React.ReactNode;
}

export function DesignLayout({ step, children }: DesignLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10">
      {/* LEFT COLUMN - Configuration */}
      <div className="space-y-6">
        {/* Nav Box */}
        <div className="border border-gc-gray-300 bg-gc-white rounded-md p-6">
          {/* STEP Header */}
          <div className="mb-4">
            <div className="text-xs font-semibold tracking-widest text-gc-gray-500 mb-1">
              STEP 2
            </div>
            <div className="text-base font-semibold text-gc-text">
              Choose your door design.
            </div>
          </div>
          <DesignStepNav />
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
