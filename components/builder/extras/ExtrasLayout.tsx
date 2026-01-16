"use client";

import { ExtrasStepNav } from "./ExtrasStepNav";
import { DesignPreview } from "@/components/builder/design/DesignPreview";

interface ExtrasLayoutProps {
  step: "windows" | "insulation" | "hardware";
  children: React.ReactNode;
}

export function ExtrasLayout({ step, children }: ExtrasLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-10">
      {/* LEFT COLUMN - Configuration */}
      <div className="bg-gc-white rounded-lg p-8 min-h-[520px]">
        <ExtrasStepNav />
        {children}
      </div>

      {/* RIGHT COLUMN - Preview */}
      <DesignPreview />
    </div>
  );
}
