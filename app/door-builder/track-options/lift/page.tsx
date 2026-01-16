"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrackLayout } from "@/components/builder/track/TrackLayout";
import { useBuilderStore, formatFtIn, TrackLiftType, isTrackLiftType } from "@/lib/builder/store";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export default function LiftPage() {
  const router = useRouter();
  const { widthFeet, widthInches, heightFeet, heightInches, trackLiftType, setTrackLiftType, requestAIPreviewFor, confirmStep } = useBuilderStore();
  const [showError, setShowError] = useState(false);
  
  const sizeText = `${formatFtIn(widthFeet, widthInches)} x ${formatFtIn(heightFeet, heightInches)}`;

  const handleBack = () => {
    router.push("/door-builder/track-options/springs");
  };

  const handleContinue = () => {
    if (trackLiftType === "") {
      setShowError(true);
      return;
    }
    confirmStep("track:lift");
    requestAIPreviewFor("track:lift");
    router.push("/door-builder/track-options/windload");
  };

  return (
    <TrackLayout step="lift">
      <div>
        <p className="text-base font-semibold text-gc-text mb-4">
          Choose your track lift type.
        </p>
        <div className="inline-block px-3 py-1 bg-gc-bg rounded text-sm text-gc-text mb-6">
          Size: {sizeText}
        </div>

        <div className="mb-6">
          <label className="block text-xs tracking-widest text-gc-gray-500 mb-3">
            Track Lift
          </label>
          <Select
            value={trackLiftType}
            onChange={(e) => {
              setShowError(false);
              const value = e.target.value;
              if (isTrackLiftType(value)) {
                setTrackLiftType(value);
              }
            }}
            placeholder="Select an option"
            id="lift-type"
          >
            <option value="Standard Lift">Standard Lift</option>
            <option value="High Lift">High Lift</option>
          </Select>
          {showError && trackLiftType === "" && (
            <p className="text-xs text-red-600 mt-2">
              Please choose your Lift here
            </p>
          )}
        </div>

        <div className="mt-10 flex gap-4">
          <Button type="button" variant="ghost" onClick={handleBack}>
            Back
          </Button>
          <Button type="button" onClick={handleContinue} disabled={trackLiftType === ""}>
            Continue
          </Button>
        </div>
      </div>
    </TrackLayout>
  );
}
