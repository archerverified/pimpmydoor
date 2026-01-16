"use client";

import { useRouter } from "next/navigation";
import { ExtrasLayout } from "@/components/builder/extras/ExtrasLayout";
import { useBuilderStore, formatFtIn } from "@/lib/builder/store";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export default function InsulationPage() {
  const router = useRouter();
  const { widthFeet, widthInches, heightFeet, heightInches, extrasInsulation, setExtrasInsulation, requestAIPreviewFor } = useBuilderStore();
  
  const sizeText = `${formatFtIn(widthFeet, widthInches)} x ${formatFtIn(heightFeet, heightInches)}`;

  const handleBack = () => {
    router.push("/door-builder/extras/windows");
  };

  const handleContinue = () => {
    requestAIPreviewFor("extras:insulation");
    router.push("/door-builder/extras/hardware");
  };

  return (
    <ExtrasLayout step="insulation">
      <div>
        <h1 className="text-sm tracking-widest font-semibold text-gc-text mb-2">
          STEP 4
        </h1>
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
            onChange={(e) => setExtrasInsulation(e.target.value as "None" | "Polystyrene (R6-R9)" | "Polyurethane (R12-R18)")}
            id="extras-insulation"
          >
            <option value="None">None</option>
            <option value="Polystyrene (R6-R9)">Polystyrene (R6-R9)</option>
            <option value="Polyurethane (R12-R18)">Polyurethane (R12-R18)</option>
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
