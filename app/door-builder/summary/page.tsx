"use client";

import { useRouter } from "next/navigation";
import { BuilderShell } from "@/components/builder/BuilderShell";
import { useBuilderStore, formatFtIn } from "@/lib/builder/store";
import { Button } from "@/components/ui/Button";

export default function SummaryPage() {
  const router = useRouter();
  const {
    widthFeet,
    widthInches,
    heightFeet,
    heightInches,
    designCollection,
    designStyle,
    designColor,
    trackSpringType,
    trackLiftType,
    trackWindLoad,
    extrasWindows,
    extrasInsulation,
    extrasHardware,
  } = useBuilderStore();

  const sizeText = `${formatFtIn(widthFeet, widthInches)} x ${formatFtIn(heightFeet, heightInches)}`;

  const handleGetQuote = () => {
    // TODO: Implement quote functionality
    console.log("Get Quote clicked");
  };

  const handleEditSelections = () => {
    router.push("/door-builder/setup/select-size");
  };

  return (
    <BuilderShell
      activeStep="extras"
      bottomBarText="REVIEW YOUR BUILD"
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-gc-white rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gc-text mb-8 text-center">
            Summary
          </h1>

          <div className="space-y-6">
            {/* Size */}
            <div>
              <h2 className="text-xs tracking-widest text-gc-gray-500 mb-2">
                SIZE
              </h2>
              <p className="text-base text-gc-text">{sizeText}</p>
            </div>

            <div className="h-px bg-gc-gray-300" />

            {/* Design */}
            <div>
              <h2 className="text-xs tracking-widest text-gc-gray-500 mb-2">
                DESIGN
              </h2>
              <p className="text-sm text-gc-text mb-1">
                Collection: {designCollection}
              </p>
              <p className="text-sm text-gc-text mb-1">Style: {designStyle}</p>
              <p className="text-sm text-gc-text">Color: {designColor}</p>
            </div>

            <div className="h-px bg-gc-gray-300" />

            {/* Track Options */}
            <div>
              <h2 className="text-xs tracking-widest text-gc-gray-500 mb-2">
                TRACK OPTIONS
              </h2>
              <p className="text-sm text-gc-text mb-1">
                Springs: {trackSpringType}
              </p>
              <p className="text-sm text-gc-text mb-1">
                Lift: {trackLiftType}
              </p>
              <p className="text-sm text-gc-text">
                Wind Load: {trackWindLoad}
              </p>
            </div>

            <div className="h-px bg-gc-gray-300" />

            {/* Extras */}
            <div>
              <h2 className="text-xs tracking-widest text-gc-gray-500 mb-2">
                EXTRAS
              </h2>
              <p className="text-sm text-gc-text mb-1">
                Windows: {extrasWindows}
              </p>
              <p className="text-sm text-gc-text mb-1">
                Insulation: {extrasInsulation}
              </p>
              <p className="text-sm text-gc-text">
                Hardware: {extrasHardware}
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button type="button" onClick={handleGetQuote}>
              Get Quote
            </Button>
            <Button type="button" variant="ghost" onClick={handleEditSelections}>
              Edit Selections
            </Button>
          </div>
        </div>
      </div>
    </BuilderShell>
  );
}
