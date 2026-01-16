"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BuilderShell } from "@/components/builder/BuilderShell";
import { useBuilderStore, formatFtIn } from "@/lib/builder/store";
import { useCartStore } from "@/lib/cart/store";
import {
  buildDoorConfigurationFromStore,
  configToId,
  computePlaceholderPriceCents,
  newLineItemId,
} from "@/lib/builder/toCartItem";
import { Button } from "@/components/ui/Button";

export default function SummaryPage() {
  const router = useRouter();
  const builderStore = useBuilderStore();
  const addItem = useCartStore((state) => state.addItem);
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
    aiPreviewB64,
    confirmStep,
  } = builderStore;

  // Confirm all steps on mount so SelectionsSummary displays all values
  useEffect(() => {
    confirmStep("setup:size");
    confirmStep("design:collection");
    confirmStep("design:style");
    confirmStep("design:color");
    confirmStep("track:springs");
    confirmStep("track:lift");
    confirmStep("track:windload");
    confirmStep("extras:windows");
    confirmStep("extras:insulation");
    confirmStep("extras:hardware");
  }, [confirmStep]);

  const sizeText = `${formatFtIn(widthFeet, widthInches)} x ${formatFtIn(heightFeet, heightInches)}`;

  const handleAddToCart = () => {
    // Build configuration from builder store
    const config = buildDoorConfigurationFromStore(() => builderStore);
    
    // Compute configurationId and price
    const configurationId = configToId(config);
    const unitPriceCents = computePlaceholderPriceCents(config);
    const lineItemId = newLineItemId();
    
    // Get AI preview image if available
    const imageDataUrl = aiPreviewB64
      ? `data:image/png;base64,${aiPreviewB64}`
      : null;
    
    // Add to cart
    addItem({
      lineItemId,
      configurationId,
      name: "Garage Door",
      configuration: config,
      qty: 1,
      unitPriceCents,
      imageDataUrl,
      currency: "usd",
    });
    
    // Navigate to cart
    router.push("/cart");
  };

  const handleViewCart = () => {
    router.push("/cart");
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
            <Button type="button" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button type="button" variant="ghost" onClick={handleViewCart}>
              View Cart
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
