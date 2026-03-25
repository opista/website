import { Button } from "@/components/button";
import { PspConfiguration } from "@/components/psp/psp.types";
import { RamIndicator } from "@/components/ram-indicator";

type PspIdentifierResultsBodyProps = {
  model: PspConfiguration;
  onBack: () => void;
  onRestart: () => void;
};

const ramByModel = {
  1000: 32,
  2000: 64,
  3000: 64,
} as const;

export const PspIdentifierResultsBody = ({
  model,
  onBack,
  onRestart,
}: PspIdentifierResultsBodyProps) => {
  const ram = ramByModel[model.model];

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="text-center font-bold text-xl">
        <p className="mt-0 mb-2 text-xl flex items-center gap-2 justify-center">
          Model
          <span className="px-2 py-1 text-2xl bg-white text-black inline-block rounded-lg">
            PSP-{model.model}
          </span>
        </p>
        <RamIndicator className="text-xl mb-6 inline-block" ram={ram} />
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
