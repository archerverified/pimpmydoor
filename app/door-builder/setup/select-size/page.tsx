"use client";

import { useRouter } from "next/navigation";
import { BuilderShell } from "@/components/builder/BuilderShell";
import { useBuilderStore } from "@/lib/builder/store";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

export default function SelectSizePage() {
  const router = useRouter();
  const {
    widthFeet,
    widthInches,
    heightFeet,
    heightInches,
    setWidth,
    setHeight,
    requestAIPreviewFor,
    confirmStep,
  } = useBuilderStore();

  const handleContinue = () => {
    confirmStep("setup:size");
    requestAIPreviewFor("setup:size");
    router.push("/door-builder/design");
  };

  return (
    <BuilderShell
      activeStep="setup"
      bottomBarText="ENTER GARAGE DOOR DIMENSIONS"
    >
      <div className="max-w-4xl mx-auto">
        {/* Step 1 Header */}
        <div className="text-center mb-8 flex flex-col gap-2">
          <h1 className="text-sm font-semibold tracking-widest text-gc-text">
            STEP 1
          </h1>
          <p className="text-base font-semibold text-gc-text">
            Measure your door size.
          </p>
          <p className="text-sm text-gc-gray-500">
            Get started by entering your exact measurements below.
          </p>
        </div>

        {/* How to Measure */}
        <div className="mb-10 flex justify-center">
          <details className="group">
            <summary className="inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-gc-text hover:underline">
              <div className="h-3 w-3 rounded-full bg-gc-yellow flex-shrink-0" />
              <span>How to measure your garage door</span>
            </summary>
            <div className="mt-3 ml-5 text-gc-gray-500 text-sm">
              <p>
                Measure the width and height of your garage door opening from the inside.
                Measure at multiple points and use the smallest dimensions. Round down to
                the nearest inch.
              </p>
            </div>
          </details>
        </div>

        {/* Width and Height Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          {/* Width Panel */}
          <div className="bg-gc-white rounded-lg p-10 md:p-12 min-h-[360px] flex flex-col">
            <h2 className="text-center text-xs tracking-widest font-semibold text-gc-gray-500">
              Select a WIDTH
            </h2>
            <div className="border-t border-gc-gray-300 w-full max-w-[340px] mx-auto mt-4 mb-0" />
            <div className="mt-10 space-y-6">
              <Select
                label="Feet"
                id="width-feet"
                value={widthFeet}
                onChange={(e) => setWidth(Number(e.target.value), widthInches)}
              >
                {Array.from({ length: 15 }, (_, i) => i + 6).map((feet) => (
                  <option key={feet} value={feet}>
                    {feet}
                  </option>
                ))}
              </Select>
              <Select
                label="Inches"
                id="width-inches"
                value={widthInches}
                onChange={(e) => setWidth(widthFeet, Number(e.target.value))}
              >
                {Array.from({ length: 12 }, (_, i) => i).map((inches) => (
                  <option key={inches} value={inches}>
                    {inches === 0 ? "0 inches" : `${inches}"`}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* Height Panel */}
          <div className="bg-gc-white rounded-lg p-10 md:p-12 min-h-[360px] flex flex-col">
            <h2 className="text-center text-xs tracking-widest font-semibold text-gc-gray-500">
              Select a HEIGHT
            </h2>
            <div className="border-t border-gc-gray-300 w-full max-w-[340px] mx-auto mt-4 mb-0" />
            <div className="mt-10 space-y-6">
              <Select
                label="Feet"
                id="height-feet"
                value={heightFeet}
                onChange={(e) => setHeight(Number(e.target.value), heightInches)}
              >
                {Array.from({ length: 15 }, (_, i) => i + 6).map((feet) => (
                  <option key={feet} value={feet}>
                    {feet}
                  </option>
                ))}
              </Select>
              <Select
                label="Inches"
                id="height-inches"
                value={heightInches}
                onChange={(e) => setHeight(heightFeet, Number(e.target.value))}
              >
                {Array.from({ length: 12 }, (_, i) => i).map((inches) => (
                  <option key={inches} value={inches}>
                    {inches === 0 ? "0 inches" : `${inches}"`}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center mt-10">
          <Button type="button" onClick={handleContinue}>
            Continue
          </Button>
        </div>

        {/* Common Sizes */}
        <div className="text-center mt-6">
          <p className="text-[11px] leading-4 text-gc-gray-500">
            Common Sizes: Garage Doors are generally categorized as Single or Double
            doors Common Single door sizes: 8' wide by 7' tall or 9' wide by 7' tall
            Common Double door sizes: 16' wide by 7' tall
          </p>
        </div>
      </div>
    </BuilderShell>
  );
}
