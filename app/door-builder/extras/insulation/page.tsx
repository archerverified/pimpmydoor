"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExtrasLayout } from "@/components/builder/extras/ExtrasLayout";
import { useBuilderStore, formatFtIn, ExtrasInsulation, isExtrasInsulation } from "@/lib/builder/store";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export default function InsulationPage() {
  const router = useRouter();
  const { widthFeet, widthInches, heightFeet, heightInches, extrasInsulation, setExtrasInsulation, requestAIPreviewFor, confirmStep } = useBuilderStore();
  const [showError, setShowError] = useState(false);
  
  const sizeText = `${formatFtIn(widthFeet, widthInches)} x ${formatFtIn(heightFeet, heightInches)}`;

  const handleBack = () => {
    router.push("/door-builder/extras/windows");
  };

  const handleContinue = () => {
    if (extrasInsulation === "") {
      setShowError(true);
      return;
    }
    confirmStep("extras:insulation");
    requestAIPreviewFor("extras:insulation");
    router.push("/door-builder/extras/hardware");
  };

  return (
    <ExtrasLayout step="insulation">
      <div>
        <p className="text-base font-semibold text-gc-text mb-4">
          Choose insulation level.
        </p>
        <div className="inline-block px-3 py-1 bg-gc-bg rounded text-sm text-gc-text mb-6">
          Size: {sizeText}
        </div>

        <div className="mb-6">
          <label className="block text-xs tracking-widest text-gc-gray-500 mb-3">
            Insulation
          </label>
          <Select
            value={extrasInsulation}
            onChange={(e) => {
              setShowError(false);
              const value = e.target.value;
              if (isExtrasInsulation(value)) {
                setExtrasInsulation(value);
              }
            }}
            placeholder="Select an option"
            id="extras-insulation"
          >
            <option value="None">None</option>
            <option value="Polystyrene (R6-R9)">Polystyrene (R6-R9)</option>
            <option value="Polyurethane (R12-R18)">Polyurethane (R12-R18)</option>
          </Select>
          {showError && extrasInsulation === "" && (
            <p className="text-xs text-red-600 mt-2">
              Please choose your Insulation here
            </p>
          )}
        </div>

        <div className="mt-10 flex gap-4">
          <Button type="button" variant="ghost" onClick={handleBack}>
            Back
          </Button>
          <Button type="button" onClick={handleContinue} disabled={extrasInsulation === ""}>
            Continue
          </Button>
        </div>
      </div>
    </ExtrasLayout>
  );
}
