import { Button } from "@/components/button";
import { BackplateIndicator } from "@/components/ipod/backplate-indicator";
import { Capacity, GenerationConfiguration } from "@/components/ipod/ipod.types";
import { RamIndicator } from "@/components/ipod/ram-indicator";

type IpodIdentifierResultsBodyProps = {
  capacity: Capacity | null;
  model: GenerationConfiguration;
  onBack: () => void;
  onRestart: () => void;
};

export const IpodIdentifierResultsBody = ({
  capacity,
  model,
  onBack,
  onRestart,
}: IpodIdentifierResultsBodyProps) => {
  const details = model.capacityOptions.find((option) => option.capacity === capacity);

  if (!details) {
    return "Something went wrong";
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="text-center font-bold text-xl">
        <p className="mt-0 mb-2 text-xl flex items-center gap-2 justify-center">
          Generation
          <span className="px-2 py-1 text-2xl bg-white text-black inline-block rounded-lg">
            {model.generation}
          </span>
        </p>
        <p className="mt-0 mb-4">
          <BackplateIndicator backplate={details.backplate} className="inline-block text-xl" />{" "}
          backplate
        </p>
        <RamIndicator className="text-xl mb-8 inline-block" ram={details.ram} />
      </div>
      <div className="flex gap-2 justify-center">
        <Button className="bg-zinc-500 hover:bg-zinc-600" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onRestart}>Restart</Button>
      </div>
    </div>
  );
};
