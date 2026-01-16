import { create } from "zustand";

type DesignCollection = "Traditional" | "Modern" | "Carriage House";
type DesignStyle = "Raised Panel" | "Flush" | "Grooved";
type DesignColor = "White" | "Almond" | "Black";
type TrackSpringType = "Torsion" | "Extension";
type TrackLiftType = "Standard Lift" | "High Lift";
type TrackWindLoad = "None" | "Wind Reinforced";
type ExtrasWindows = "No Windows" | "Top Panel Windows" | "Full View (Glass)";
type ExtrasInsulation = "None" | "Polystyrene (R6-R9)" | "Polyurethane (R12-R18)";
type ExtrasHardware = "None" | "Handles + Hinges (Black)" | "Handles + Hinges (Bronze)";

interface BuilderStore {
  widthFeet: number;
  widthInches: number;
  heightFeet: number;
  heightInches: number;
  designCollection: DesignCollection | "";
  designStyle: DesignStyle | "";
  designColor: DesignColor | "";
  trackSpringType: TrackSpringType | "";
  trackLiftType: TrackLiftType | "";
  trackWindLoad: TrackWindLoad | "";
  extrasWindows: ExtrasWindows | "";
  extrasInsulation: ExtrasInsulation | "";
  extrasHardware: ExtrasHardware | "";
  setWidth: (feet: number, inches: number) => void;
  setHeight: (feet: number, inches: number) => void;
  setDesignCollection: (value: DesignCollection | "") => void;
  setDesignStyle: (value: DesignStyle | "") => void;
  setDesignColor: (value: DesignColor | "") => void;
  setTrackSpringType: (value: TrackSpringType | "") => void;
  setTrackLiftType: (value: TrackLiftType | "") => void;
  setTrackWindLoad: (value: TrackWindLoad | "") => void;
  setExtrasWindows: (value: ExtrasWindows | "") => void;
  setExtrasInsulation: (value: ExtrasInsulation | "") => void;
  setExtrasHardware: (value: ExtrasHardware | "") => void;
  aiPreviewEnabled: boolean;
  aiPreviewB64: string | null;
  aiPreviewLastKey: string | null;
  aiPreviewRequestedKey: string | null;
  aiPreviewGeneratedKeys: Record<string, true>;
  requestAIPreviewFor: (key: string) => void;
  commitAIPreview: (key: string, b64: string) => void;
  setAIPreviewEnabled: (enabled: boolean) => void;
  confirmedSteps: Record<string, true>;
  confirmStep: (key: string) => void;
  reset: () => void;
}

export const useBuilderStore = create<BuilderStore>((set) => ({
  widthFeet: 8,
  widthInches: 0,
  heightFeet: 7,
  heightInches: 0,
  designCollection: "",
  designStyle: "",
  designColor: "",
  trackSpringType: "",
  trackLiftType: "",
  trackWindLoad: "",
  extrasWindows: "",
  extrasInsulation: "",
  extrasHardware: "",
  setWidth: (feet, inches) => set({ widthFeet: feet, widthInches: inches }),
  setHeight: (feet, inches) => set({ heightFeet: feet, heightInches: inches }),
  setDesignCollection: (value) => set({ designCollection: value as DesignCollection | "" }),
  setDesignStyle: (value) => set({ designStyle: value as DesignStyle | "" }),
  setDesignColor: (value) => set({ designColor: value as DesignColor | "" }),
  setTrackSpringType: (value) => set({ trackSpringType: value as TrackSpringType | "" }),
  setTrackLiftType: (value) => set({ trackLiftType: value as TrackLiftType | "" }),
  setTrackWindLoad: (value) => set({ trackWindLoad: value as TrackWindLoad | "" }),
  setExtrasWindows: (value) => set({ extrasWindows: value as ExtrasWindows | "" }),
  setExtrasInsulation: (value) => set({ extrasInsulation: value as ExtrasInsulation | "" }),
  setExtrasHardware: (value) => set({ extrasHardware: value as ExtrasHardware | "" }),
  aiPreviewEnabled: true,
  aiPreviewB64: null,
  aiPreviewLastKey: null,
  aiPreviewRequestedKey: null,
  aiPreviewGeneratedKeys: {},
  requestAIPreviewFor: (key) =>
    set((state) => {
      if (state.aiPreviewGeneratedKeys[key]) {
        return {};
      }
      return { aiPreviewRequestedKey: key };
    }),
  commitAIPreview: (key, b64) =>
    set((state) => ({
      aiPreviewB64: b64,
      aiPreviewLastKey: key,
      aiPreviewGeneratedKeys: { ...state.aiPreviewGeneratedKeys, [key]: true },
      aiPreviewRequestedKey: null,
    })),
  setAIPreviewEnabled: (enabled) => set({ aiPreviewEnabled: enabled }),
  confirmedSteps: {},
  confirmStep: (key) =>
    set((state) => ({
      confirmedSteps: { ...state.confirmedSteps, [key]: true },
    })),
  reset: () => set({
    widthFeet: 8,
    widthInches: 0,
    heightFeet: 7,
    heightInches: 0,
    designCollection: "",
    designStyle: "",
    designColor: "",
    trackSpringType: "",
    trackLiftType: "",
    trackWindLoad: "",
    extrasWindows: "",
    extrasInsulation: "",
    extrasHardware: "",
    aiPreviewEnabled: true,
    aiPreviewB64: null,
    aiPreviewLastKey: null,
    aiPreviewRequestedKey: null,
    aiPreviewGeneratedKeys: {},
    confirmedSteps: {},
  }),
}));

/**
 * Format feet and inches as a string (e.g., "8' 0\"")
 */
export function formatFtIn(feet: number, inches: number): string {
  return `${feet}' ${inches}"`;
}

/**
 * Convert feet and inches to total inches
 */
export function toInches(feet: number, inches: number): number {
  return feet * 12 + inches;
}
