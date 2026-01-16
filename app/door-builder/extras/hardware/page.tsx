"use client";

import { useRouter } from "next/navigation";
import { ExtrasLayout } from "@/components/builder/extras/ExtrasLayout";
import { useBuilderStore, formatFtIn } from "@/lib/builder/store";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export default function HardwarePage() {
  const router = useRouter();
  const { widthFeet, widthInches, heightFeet, heightInches, extrasHardware, setExtrasHardware, requestAIPreviewFor } = useBuilderStore();
  
  const sizeText = `${formatFtIn(widthFeet, widthInches)} x ${formatFtIn(heightFeet, heightInches)}`;

  const handleBack = () => {
    router.push("/door-builder/extras/insulation");
  };

  const handleContinue = () => {
    requestAIPreviewFor("extras:hardware");
    router.push("/door-builder/summary");
  };

  return (
    <ExtrasLayout step="hardware">
      <div>
        <h1 className="text-sm tracking-widest font-semibold text-gc-text mb-2">
          STEP 4
        </h1>
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
            onChange={(e) => setExtrasHardware(e.target.value as "None" | "Handles + Hinges (Black)" | "Handles + Hinges (Bronze)")}
            id="extras-hardware"
          >
            <option value="None">None</option>
            <option value="Handles + Hinges (Black)">Handles + Hinges (Black)</option>
            <option value="Handles + Hinges (Bronze)">Handles + Hinges (Bronze)</option>
          </Select>
        </div>

        <div className="mt-10 flex gap-4">
          <Button type="button" variant="ghost" onClick={handleBack}>
            Back
          </Button>
          <Button type="button" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
    </ExtrasLayout>
  );
}
