type BackplateSize = "thick" | "thin";

type Capacity = 30 | 60 | 80 | 120 | 160;

type Ram = 32 | 64;

type Generation = 5 | 5.5 | 6 | 6.5 | 7;

type CapacityOption = {
  capacity: Capacity;
  backplate: BackplateSize;
  ram: Ram;
};

type GenerationConfiguration = {
  capacityOptions: CapacityOption[];
  generation: Generation;
  hasSearch: boolean;
  hasMetalFaceplate: boolean;
  years: number[];
};
