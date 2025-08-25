export type BackplateSize = "thick" | "thin";

export type Capacity = 30 | 60 | 80 | 120 | 160;

export type Ram = 32 | 64;

export type Generation = 5 | 5.5 | 6 | 6.5 | 7;

export type CapacityOption = {
  capacity: Capacity;
  backplate: BackplateSize;
  ram: Ram;
};

export type GenerationConfiguration = {
  capacityOptions: CapacityOption[];
  generation: Generation;
  hasSearch: boolean;
  hasMetalFaceplate: boolean;
  years: number[];
};
