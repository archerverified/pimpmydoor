"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExtrasLayout } from "@/components/builder/extras/ExtrasLayout";
import { useBuilderStore, formatFtIn } from "@/lib/builder/store";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export default function HardwarePage() {
  const router = useRouter();
  const { widthFeet, widthInches, heightFeet, heightInches, extrasHardware, setExtrasHardware, requestAIPreviewFor, confirmStep } = useBuilderStore();
  const [showError, setShowError] = useState(false);
  
  const sizeText = `${formatFtIn(widthFeet, widthInches)} x ${formatFtIn(heightFeet, heightInches)}`;

  const handleBack = () => {
    router.push("/door-builder/extras/insulation");
  };

  const handleContinue = () => {
    if (extrasHardware === "") {
      setShowError(true);
      return;
    }
    confirmStep("extras:hardware");
    requestAIPreviewFor("extras:hardware");
    router.push("/door-builder/summary");
  };

  return (
    <ExtrasLayout step="hardware">
      <div>
        <p className="text-base font-semibold text-gc-text mb-4">
          Choose decorative hardware (optional).
        </p>
        <div className="inline-block px-3 py-1 bg-gc-bg rounded text-sm text-gc-text mb-6">
          Size: {sizeText}
        </div>

        <div className="mb-6">
          <label className="block text-xs tracking-widest text-gc-gray-500 mb-3">
            Hardware
          </label>
          <Select
            value={extrasHardware}
            onChange={(e) => {
              setShowError(false);
              setExtrasHardware(e.target.value as "None" | "Handles + Hinges (Black)" | "Handles + Hinges (Bronze)" | "");
            }}
            placeholder="Select an option"
            id="extras-hardware"
          >
            <option value="None">None</option>
            <option value="Handles + Hinges (Black)">Handles + Hinges (Black)</option>
            <option value="Handles + Hinges (Bronze)">Handles + Hinges (Bronze)</option>
          </Select>
          {showError && extrasHardware === "" && (
            <p className="text-xs text-red-600 mt-2">
              Please choose your Hardware here
            </p>
          )}
        </div>

        <div className="mt-10 flex gap-4">
          <Button type="button" variant="ghost" onClick={handleBack}>
            Back
          </Button>
          <Button type="button" onClick={handleContinue} disabled={extrasHardware === ""}>
            Continue
          </Button>
        </div>
      </div>
    </ExtrasLayout>
  );
}
