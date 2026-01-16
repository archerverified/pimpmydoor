"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DesignLayout } from "@/components/builder/design/DesignLayout";
import { useBuilderStore, formatFtIn } from "@/lib/builder/store";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export default function ColorPage() {
  const router = useRouter();
  const { widthFeet, widthInches, heightFeet, heightInches, designColor, setDesignColor, requestAIPreviewFor, confirmStep } = useBuilderStore();
  const [showError, setShowError] = useState(false);
  
  const sizeText = `${formatFtIn(widthFeet, widthInches)} x ${formatFtIn(heightFeet, heightInches)}`;

  const handleBack = () => {
    router.push("/door-builder/design/style");
  };

  const handleContinue = () => {
    if (designColor === "") {
      setShowError(true);
      return;
    }
    confirmStep("design:color");
    requestAIPreviewFor("design:color");
    router.push("/door-builder/track-options");
  };

  return (
    <DesignLayout step="color">
      <div>
        <p className="text-base font-semibold text-gc-text mb-4">
          Choose your door color.
        </p>
        <div className="inline-block px-3 py-1 bg-gc-bg rounded text-sm text-gc-text mb-6">
          Size: {sizeText}
        </div>

        <div className="mb-6">
          <label className="block text-xs tracking-widest text-gc-gray-500 mb-3">
            Color
          </label>
          <Select
            value={designColor}
            onChange={(e) => {
              setShowError(false);
              setDesignColor(e.target.value as "White" | "Almond" | "Black" | "");
            }}
            placeholder="Select an option"
            id="door-color"
          >
            <option value="White">White</option>
            <option value="Almond">Almond</option>
            <option value="Black">Black</option>
          </Select>
          {showError && designColor === "" && (
            <p className="text-xs text-red-600 mt-2">
              Please choose your Door Color here
            </p>
          )}
        </div>

        <div className="mt-10 flex gap-4">
          <Button type="button" variant="ghost" onClick={handleBack}>
            Back
          </Button>
          <Button type="button" onClick={handleContinue} disabled={designColor === ""}>
            Continue
          </Button>
        </div>
      </div>
    </DesignLayout>
  );
}
