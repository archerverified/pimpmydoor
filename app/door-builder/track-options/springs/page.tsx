"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrackLayout } from "@/components/builder/track/TrackLayout";
import { useBuilderStore, formatFtIn, TrackSpringType, isTrackSpringType } from "@/lib/builder/store";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export default function SpringsPage() {
  const router = useRouter();
  const { widthFeet, widthInches, heightFeet, heightInches, trackSpringType, setTrackSpringType, requestAIPreviewFor, confirmStep } = useBuilderStore();
  const [showError, setShowError] = useState(false);
  
  const sizeText = `${formatFtIn(widthFeet, widthInches)} x ${formatFtIn(heightFeet, heightInches)}`;

  const handleContinue = () => {
    if (trackSpringType === "") {
      setShowError(true);
      return;
    }
    confirmStep("track:springs");
    requestAIPreviewFor("track:springs");
    router.push("/door-builder/track-options/lift");
  };

  return (
    <TrackLayout step="springs">
      <div>
        <p className="text-base font-semibold text-gc-text mb-4">
          Choose your spring type.
        </p>
        <div className="inline-block px-3 py-1 bg-gc-bg rounded text-sm text-gc-text mb-6">
          Size: {sizeText}
        </div>

        <div className="mb-6">
          <label className="block text-xs tracking-widest text-gc-gray-500 mb-3">
            Spring Type
          </label>
          <Select
            value={trackSpringType}
            onChange={(e) => {
              setShowError(false);
              const value = e.target.value;
              if (isTrackSpringType(value)) {
                setTrackSpringType(value);
              }
            }}
            placeholder="Select an option"
            id="spring-type"
          >
            <option value="Torsion">Torsion</option>
            <option value="Extension">Extension</option>
          </Select>
          {showError && trackSpringType === "" && (
            <p className="text-xs text-red-600 mt-2">
              Please choose your Springs here
            </p>
          )}
        </div>

        <div className="mt-10">
          <Button type="button" onClick={handleContinue} disabled={trackSpringType === ""}>
            Continue
          </Button>
        </div>
      </div>
    </TrackLayout>
  );
}
