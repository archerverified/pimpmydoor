"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExtrasLayout } from "@/components/builder/extras/ExtrasLayout";
import { useBuilderStore, formatFtIn, ExtrasWindows, isExtrasWindows } from "@/lib/builder/store";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export default function WindowsPage() {
  const router = useRouter();
  const { widthFeet, widthInches, heightFeet, heightInches, extrasWindows, setExtrasWindows, requestAIPreviewFor, confirmStep } = useBuilderStore();
  const [showError, setShowError] = useState(false);
  
  const sizeText = `${formatFtIn(widthFeet, widthInches)} x ${formatFtIn(heightFeet, heightInches)}`;

  const handleContinue = () => {
    if (extrasWindows === "") {
      setShowError(true);
      return;
    }
    confirmStep("extras:windows");
    requestAIPreviewFor("extras:windows");
    router.push("/door-builder/extras/insulation");
  };

  return (
    <ExtrasLayout step="windows">
      <div>
        <p className="text-base font-semibold text-gc-text mb-4">
          Add windows (optional).
        </p>
        <div className="inline-block px-3 py-1 bg-gc-bg rounded text-sm text-gc-text mb-6">
          Size: {sizeText}
        </div>

        <div className="mb-6">
          <label className="block text-xs tracking-widest text-gc-gray-500 mb-3">
            Windows
          </label>
          <Select
            value={extrasWindows}
            onChange={(e) => {
              setShowError(false);
              const value = e.target.value;
              if (isExtrasWindows(value)) {
                setExtrasWindows(value);
              }
            }}
            placeholder="Select an option"
            id="extras-windows"
          >
            <option value="No Windows">No Windows</option>
            <option value="Top Panel Windows">Top Panel Windows</option>
            <option value="Full View (Glass)">Full View (Glass)</option>
          </Select>
          {showError && extrasWindows === "" && (
            <p className="text-xs text-red-600 mt-2">
              Please choose your Windows here
            </p>
          )}
        </div>

        <div className="mt-10">
          <Button type="button" onClick={handleContinue} disabled={extrasWindows === ""}>
            Continue
          </Button>
        </div>
      </div>
    </ExtrasLayout>
  );
}
