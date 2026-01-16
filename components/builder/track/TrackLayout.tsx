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
      <div className="bg-gc-white rounded-lg p-8 min-h-[520px]">
        <TrackStepNav />
        {children}
      </div>

      {/* RIGHT COLUMN - Preview */}
      <DesignPreview />
    </div>
  );
}
