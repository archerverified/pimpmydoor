"use client";

import { useRouter } from "next/navigation";
import { DesignLayout } from "@/components/builder/design/DesignLayout";
import { useBuilderStore, formatFtIn } from "@/lib/builder/store";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export default function ColorPage() {
  const router = useRouter();
  const { widthFeet, widthInches, heightFeet, heightInches, designColor, setDesignColor, requestAIPreviewFor } = useBuilderStore();
  
  const sizeText = `${formatFtIn(widthFeet, widthInches)} x ${formatFtIn(heightFeet, heightInches)}`;

  const handleBack = () => {
    router.push("/door-builder/design/style");
  };

  const handleContinue = () => {
    requestAIPreviewFor("design:color");
    router.push("/door-builder/track-options");
  };

  return (
    <DesignLayout step="color">
      <div>
        <h1 className="text-sm tracking-widest font-semibold text-gc-text mb-2">
          STEP 2
        </h1>
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
            onChange={(e) => setDesignColor(e.target.value as "White" | "Almond" | "Black")}
            id="door-color"
          >
            <option value="White">White</option>
            <option value="Almond">Almond</option>
            <option value="Black">Black</option>
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
    </DesignLayout>
  );
}
