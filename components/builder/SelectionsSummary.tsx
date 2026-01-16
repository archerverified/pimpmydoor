"use client";

import { useBuilderStore, formatFtIn } from "@/lib/builder/store";
import { cn } from "@/lib/cn";

function formatValue(value: string | undefined | null): string {
  if (value === undefined || value === null || value === "") {
    return "—";
  }
  return value;
}

export function SelectionsSummary() {
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
    confirmedSteps,
  } = useBuilderStore();

  const sizeText = `${formatFtIn(widthFeet, widthInches)} x ${formatFtIn(heightFeet, heightInches)}`;

  const selections = [
    {
      label: "SIZE",
      value: confirmedSteps["setup:size"] ? sizeText : "Not added",
    },
    {
      label: "COLLECTION",
      value: confirmedSteps["design:collection"]
        ? formatValue(designCollection)
        : "Not added",
    },
    {
      label: "STYLE",
      value: confirmedSteps["design:style"]
        ? formatValue(designStyle)
        : "Not added",
    },
    {
      label: "COLOR",
      value: confirmedSteps["design:color"]
        ? formatValue(designColor)
        : "Not added",
    },
    {
      label: "SPRINGS",
      value: confirmedSteps["track:springs"]
        ? formatValue(trackSpringType)
        : "Not added",
    },
    {
      label: "LIFT",
      value: confirmedSteps["track:lift"]
        ? formatValue(trackLiftType)
        : "Not added",
    },
    {
      label: "WIND LOAD",
      value: confirmedSteps["track:windload"]
        ? formatValue(trackWindLoad)
        : "Not added",
    },
    {
      label: "WINDOWS",
      value: confirmedSteps["extras:windows"]
        ? formatValue(extrasWindows)
        : "Not added",
    },
    {
      label: "INSULATION",
      value: confirmedSteps["extras:insulation"]
        ? formatValue(extrasInsulation)
        : "Not added",
    },
    {
      label: "HARDWARE",
      value: confirmedSteps["extras:hardware"]
        ? formatValue(extrasHardware)
        : "Not added",
    },
  ];

  const content = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
      {selections.map((selection) => {
        const isNotAdded = selection.value === "Not added";
        return (
          <div key={selection.label}>
            <div className="text-[11px] tracking-widest text-gc-gray-500 mb-1">
              {selection.label}
            </div>
            <div
              className={cn(
                "text-sm font-medium",
                isNotAdded ? "text-gc-gray-500" : "text-gc-text"
              )}
            >
              {selection.value}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-gc-white border border-gc-gray-300 p-4 rounded-md">
      {/* Desktop: Always visible */}
      <div className="hidden md:block">
        <div className="text-sm font-semibold text-gc-text">Your Selections</div>
        {content}
      </div>
      
      {/* Mobile: Collapsible */}
      <details className="md:hidden" open>
        <summary className="cursor-pointer text-sm font-semibold text-gc-text list-none">
          Your Selections
        </summary>
        {content}
      </details>
    </div>
  );
}
