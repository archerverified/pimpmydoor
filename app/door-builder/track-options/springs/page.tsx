"use client";

import { useRouter } from "next/navigation";
import { TrackLayout } from "@/components/builder/track/TrackLayout";
import { useBuilderStore, formatFtIn } from "@/lib/builder/store";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export default function SpringsPage() {
  const router = useRouter();
  const { widthFeet, widthInches, heightFeet, heightInches, trackSpringType, setTrackSpringType, requestAIPreviewFor } = useBuilderStore();
  
  const sizeText = `${formatFtIn(widthFeet, widthInches)} x ${formatFtIn(heightFeet, heightInches)}`;

  const handleContinue = () => {
    requestAIPreviewFor("track:springs");
    router.push("/door-builder/track-options/lift");
  };

  return (
    <TrackLayout step="springs">
      <div>
        <h1 className="text-sm tracking-widest font-semibold text-gc-text mb-2">
          STEP 3
        </h1>
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
            onChange={(e) => setTrackSpringType(e.target.value as "Torsion" | "Extension")}
            id="spring-type"
          >
            <option value="Torsion">Torsion</option>
            <option value="Extension">Extension</option>
          </Select>
        </div>

        <div className="mt-10">
          <Button type="button" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
    </TrackLayout>
  );
}
