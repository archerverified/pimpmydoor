import type { BuilderStore } from "./store";
import type { DoorConfiguration } from "@/lib/cart/types";

/**
 * Builds a DoorConfiguration from the builder store state
 */
export function buildDoorConfigurationFromStore(
  getState: () => BuilderStore
): DoorConfiguration {
  const state = getState();
  return {
    size: {
      widthFeet: state.widthFeet,
      widthInches: state.widthInches,
      heightFeet: state.heightFeet,
      heightInches: state.heightInches,
    },
    design: {
      collection: state.designCollection,
      style: state.designStyle,
      color: state.designColor,
    },
    track: {
      springType: state.trackSpringType,
      liftType: state.trackLiftType,
      windLoad: state.trackWindLoad,
    },
    extras: {
      windows: state.extrasWindows,
      insulation: state.extrasInsulation,
      hardware: state.extrasHardware,
    },
  };
}

/**
 * Creates a stable deterministic hash of a DoorConfiguration
 */
export function configToId(config: DoorConfiguration): string {
  // Create a stable JSON representation (sorted keys)
  const normalized = JSON.stringify(config, Object.keys(config).sort());
  
  // Simple hash function for browser compatibility
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    const char = normalized.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Return as hex string
  return Math.abs(hash).toString(16);
}

/**
 * Generates a unique line item ID for each add-to-cart action
 */
export function newLineItemId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * Computes placeholder pricing in cents based on configuration
 */
export function computePlaceholderPriceCents(
  config: DoorConfiguration
): number {
  let priceCents = 149900; // Base: $1499

  // Size adjustments
  if (config.size.widthFeet >= 16) {
    priceCents += 50000; // +$500
  }
  if (config.size.heightFeet >= 8) {
    priceCents += 15000; // +$150
  }

  // Windows
  if (config.extras.windows === "Top Panel Windows") {
    priceCents += 20000; // +$200
  } else if (config.extras.windows === "Full View (Glass)") {
    priceCents += 60000; // +$600
  }

  // Insulation
  if (config.extras.insulation === "Polystyrene (R6-R9)") {
    priceCents += 25000; // +$250
  } else if (config.extras.insulation === "Polyurethane (R12-R18)") {
    priceCents += 45000; // +$450
  }

  // Wind Reinforced
  if (config.track.windLoad === "Wind Reinforced") {
    priceCents += 18000; // +$180
  }

  // Decorative hardware (non-"None")
  if (config.extras.hardware !== "None") {
    priceCents += 7500; // +$75
  }

  return priceCents;
}
