"use client";

import { useRouter } from "next/navigation";
import { ExtrasLayout } from "@/components/builder/extras/ExtrasLayout";
import { useBuilderStore, formatFtIn } from "@/lib/builder/store";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export default function WindowsPage() {
  const router = useRouter();
  const { widthFeet, widthInches, heightFeet, heightInches, extrasWindows, setExtrasWindows, requestAIPreviewFor } = useBuilderStore();
  
  const sizeText = `${formatFtIn(widthFeet, widthInches)} x ${formatFtIn(heightFeet, heightInches)}`;

  const handleContinue = () => {
    requestAIPreviewFor("extras:windows");
    router.push("/door-builder/extras/insulation");
  };

  return (
    <ExtrasLayout step="windows">
      <div>
        <h1 className="text-sm tracking-widest font-semibold text-gc-text mb-2">
          STEP 4
        </h1>
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
            onChange={(e) => setExtrasWindows(e.target.value as "No Windows" | "Top Panel Windows" | "Full View (Glass)")}
            id="extras-windows"
          >
            <option value="No Windows">No Windows</option>
            <option value="Top Panel Windows">Top Panel Windows</option>
            <option value="Full View (Glass)">Full View (Glass)</option>
          </Select>
        </div>

        <div className="mt-10">
          <Button type="button" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
    </ExtrasLayout>
  );
}
