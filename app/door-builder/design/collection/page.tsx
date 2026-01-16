"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DesignLayout } from "@/components/builder/design/DesignLayout";
import { useBuilderStore, formatFtIn, DesignCollection, isDesignCollection } from "@/lib/builder/store";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export default function CollectionPage() {
  const router = useRouter();
  const { widthFeet, widthInches, heightFeet, heightInches, designCollection, setDesignCollection, requestAIPreviewFor, confirmStep } = useBuilderStore();
  const [showError, setShowError] = useState(false);
  
  const sizeText = `${formatFtIn(widthFeet, widthInches)} x ${formatFtIn(heightFeet, heightInches)}`;

  const handleContinue = () => {
    if (designCollection === "") {
      setShowError(true);
      return;
    }
    confirmStep("design:collection");
    requestAIPreviewFor("design:collection");
    router.push("/door-builder/design/style");
  };

  return (
    <DesignLayout step="collection">
      <div>
        <p className="text-base font-semibold text-gc-text mb-4">
          Choose your door collection.
        </p>
        <div className="inline-block px-3 py-1 bg-gc-bg rounded text-sm text-gc-text mb-6">
          Size: {sizeText}
        </div>

        <div className="mb-6">
          <label className="block text-xs tracking-widest text-gc-gray-500 mb-3">
            Door Collection
          </label>
          <Select
            value={designCollection}
            onChange={(e) => {
              setShowError(false);
              const value = e.target.value;
              if (isDesignCollection(value)) {
                setDesignCollection(value);
              }
            }}
            placeholder="Select an option"
            id="door-collection"
          >
            <option value="Traditional">Traditional</option>
            <option value="Modern">Modern</option>
            <option value="Carriage House">Carriage House</option>
          </Select>
          {showError && designCollection === "" && (
            <p className="text-xs text-red-600 mt-2">
              Please choose your Door Collection here
            </p>
          )}
        </div>

        <div className="mt-10">
          <Button type="button" onClick={handleContinue} disabled={designCollection === ""}>
            Continue
          </Button>
        </div>
      </div>
    </DesignLayout>
  );
}
