"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrackLayout } from "@/components/builder/track/TrackLayout";
import { useBuilderStore, formatFtIn, TrackWindLoad, isTrackWindLoad } from "@/lib/builder/store";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export default function WindLoadPage() {
  const router = useRouter();
  const { widthFeet, widthInches, heightFeet, heightInches, trackWindLoad, setTrackWindLoad, requestAIPreviewFor, confirmStep } = useBuilderStore();
  const [showError, setShowError] = useState(false);
  
  const sizeText = `${formatFtIn(widthFeet, widthInches)} x ${formatFtIn(heightFeet, heightInches)}`;

  const handleBack = () => {
    router.push("/door-builder/track-options/lift");
  };

  const handleContinue = () => {
    if (trackWindLoad === "") {
      setShowError(true);
      return;
    }
    confirmStep("track:windload");
    requestAIPreviewFor("track:windload");
    router.push("/door-builder/extras");
  };

  return (
    <TrackLayout step="windload">
      <div>
        <p className="text-base font-semibold text-gc-text mb-4">
          Choose wind load reinforcement.
        </p>
        <div className="inline-block px-3 py-1 bg-gc-bg rounded text-sm text-gc-text mb-6">
          Size: {sizeText}
        </div>

        <div className="mb-6">
          <label className="block text-xs tracking-widest text-gc-gray-500 mb-3">
            Wind Load
          </label>
          <Select
            value={trackWindLoad}
            onChange={(e) => {
              setShowError(false);
              const value = e.target.value;
              if (isTrackWindLoad(value)) {
                setTrackWindLoad(value);
              }
            }}
            placeholder="Select an option"
            id="wind-load"
          >
            <option value="None">None</option>
            <option value="Wind Reinforced">Wind Reinforced</option>
          </Select>
          {showError && trackWindLoad === "" && (
            <p className="text-xs text-red-600 mt-2">
              Please choose your Wind Load here
            </p>
          )}
        </div>

        <div className="mt-10 flex gap-4">
          <Button type="button" variant="ghost" onClick={handleBack}>
            Back
          </Button>
          <Button type="button" onClick={handleContinue} disabled={trackWindLoad === ""}>
            Continue
          </Button>
        </div>
      </div>
    </TrackLayout>
  );
}
