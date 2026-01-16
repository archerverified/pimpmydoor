"use client";

import { useRouter } from "next/navigation";
import { DesignLayout } from "@/components/builder/design/DesignLayout";
import { useBuilderStore, formatFtIn } from "@/lib/builder/store";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export default function CollectionPage() {
  const router = useRouter();
  const { widthFeet, widthInches, heightFeet, heightInches, designCollection, setDesignCollection, requestAIPreviewFor } = useBuilderStore();
  
  const sizeText = `${formatFtIn(widthFeet, widthInches)} x ${formatFtIn(heightFeet, heightInches)}`;

  const handleContinue = () => {
    requestAIPreviewFor("design:collection");
    router.push("/door-builder/design/style");
  };

  return (
    <DesignLayout step="collection">
      <div>
        <h1 className="text-sm tracking-widest font-semibold text-gc-text mb-2">
          STEP 2
        </h1>
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
            onChange={(e) => setDesignCollection(e.target.value as "Traditional" | "Modern" | "Carriage House")}
            id="door-collection"
          >
            <option value="Traditional">Traditional</option>
            <option value="Modern">Modern</option>
            <option value="Carriage House">Carriage House</option>
          </Select>
        </div>

        <div className="mt-10">
          <Button type="button" onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </div>
    </DesignLayout>
  );
}
