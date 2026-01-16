"use client";

import { useEffect, useState } from "react";
import { useBuilderStore, formatFtIn } from "@/lib/builder/store";

export function DesignPreview() {
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
    aiPreviewEnabled,
    aiPreviewB64,
    aiPreviewRequestedKey,
    commitAIPreview,
  } = useBuilderStore();
  
  const [error, setError] = useState<string | null>(null);
  const sizeText = `${formatFtIn(widthFeet, widthInches)} x ${formatFtIn(heightFeet, heightInches)}`;

  const hasTrackOptions = trackSpringType || trackLiftType || trackWindLoad;
  const hasExtras = extrasWindows !== "No Windows" || extrasInsulation !== "None" || extrasHardware !== "None";

  useEffect(() => {
    if (!aiPreviewEnabled || !aiPreviewRequestedKey) {
      return;
    }

    const generatePreview = async () => {
      try {
        setError(null);
        const response = await fetch("/api/ai-preview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate preview");
        }

        const data = await response.json();
        if (data.b64) {
          commitAIPreview(aiPreviewRequestedKey, data.b64);
        }
      } catch (err) {
        console.error("Preview generation error:", err);
        setError("Preview generation failed");
        // Clear requested key on error
        useBuilderStore.setState({ aiPreviewRequestedKey: null });
      }
    };

    generatePreview();
  }, [
    aiPreviewEnabled,
    aiPreviewRequestedKey,
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
    commitAIPreview,
  ]);

  return (
    <div className="bg-gc-white rounded-lg p-8 min-h-[520px] flex flex-col">
      <label className="block text-xs tracking-widest text-gc-gray-500 mb-6">
        Preview
      </label>
      
      <div className="flex-1 flex flex-col items-center justify-center border border-gc-gray-300 rounded-lg p-8">
        <div className="w-full max-w-md aspect-[8/7] flex flex-col items-center justify-center">
          {aiPreviewEnabled && aiPreviewB64 ? (
            <img
              src={`data:image/png;base64,${aiPreviewB64}`}
              alt="Garage door preview"
              className="w-full h-full object-contain rounded"
            />
          ) : (
            <>
              <p className="text-gc-text font-medium mb-4">Preview will render here</p>
              <p className="text-sm text-gc-gray-500 mb-2">Size: {sizeText}</p>
              <p className="text-sm text-gc-gray-500 mb-1">
                Collection: {designCollection}
              </p>
              <p className="text-sm text-gc-gray-500 mb-1">Style: {designStyle}</p>
              <p className="text-sm text-gc-gray-500 mb-3">Color: {designColor}</p>
              {hasTrackOptions && (
                <>
                  <div className="w-full h-px bg-gc-gray-300 my-2" />
                  {trackSpringType && (
                    <p className="text-sm text-gc-gray-500 mb-1">
                      Springs: {trackSpringType}
                    </p>
                  )}
                  {trackLiftType && (
                    <p className="text-sm text-gc-gray-500 mb-1">
                      Lift: {trackLiftType}
                    </p>
                  )}
                  {trackWindLoad && trackWindLoad !== "None" && (
                    <p className="text-sm text-gc-gray-500 mb-3">
                      Wind Load: {trackWindLoad}
                    </p>
                  )}
                </>
              )}
              {hasExtras && (
                <>
                  <div className="w-full h-px bg-gc-gray-300 my-2" />
                  {extrasWindows !== "No Windows" && (
                    <p className="text-sm text-gc-gray-500 mb-1">
                      Windows: {extrasWindows}
                    </p>
                  )}
                  {extrasInsulation !== "None" && (
                    <p className="text-sm text-gc-gray-500 mb-1">
                      Insulation: {extrasInsulation}
                    </p>
                  )}
                  {extrasHardware !== "None" && (
                    <p className="text-sm text-gc-gray-500">
                      Hardware: {extrasHardware}
                    </p>
                  )}
                </>
              )}
            </>
          )}
          {error && (
            <p className="text-xs text-red-500 mt-2">{error}</p>
          )}
        </div>
      </div>

      <p className="text-xs text-gc-gray-500 text-center mt-6">
        Selections will update the preview in real time.
      </p>
    </div>
  );
}
