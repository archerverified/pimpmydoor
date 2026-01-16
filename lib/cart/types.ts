export type DoorConfiguration = {
  size: {
    widthFeet: number;
    widthInches: number;
    heightFeet: number;
    heightInches: number;
  };
  design: {
    collection: string;
    style: string;
    color: string;
  };
  track: {
    springType: string;
    liftType: string;
    windLoad: string;
  };
  extras: {
    windows: string;
    insulation: string;
    hardware: string;
  };
};

export type CartItem = {
  lineItemId: string; // unique per add-to-cart click
  configurationId: string; // deterministic hash of DoorConfiguration
  name: string; // e.g. "Garage Door"
  configuration: DoorConfiguration;
  qty: number;
  unitPriceCents: number; // placeholder pricing
  imageDataUrl?: string | null; // optional AI preview snapshot
  createdAt: number; // timestamp
  currency: "usd";
  stripeProductId?: string;
  stripePriceId?: string;
};
