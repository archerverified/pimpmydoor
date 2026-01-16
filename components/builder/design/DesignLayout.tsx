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
      <div className="bg-gc-white rounded-lg p-8 min-h-[520px]">
        <DesignStepNav />
        {children}
      </div>

      {/* RIGHT COLUMN - Preview */}
      <DesignPreview />
    </div>
  );
}
