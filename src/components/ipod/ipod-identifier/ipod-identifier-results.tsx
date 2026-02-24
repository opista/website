import { Button } from "@/components/button";
import { BackplateIndicator } from "@/components/ipod/backplate-indicator";
import { RamIndicator } from "@/components/ipod/ram-indicator";
import { Capacity, Generation, GenerationConfiguration } from "../ipod.types";

import { IpodIdentifierLayout } from "./ipod-identifier-layout";

type IpodIdentifierResultsProps = {
  capacity: Capacity | null;
  model: GenerationConfiguration;
  onRestart?: () => void;
};

const ipodImageMap: Record<Generation, string> = {
  5: "/posts/ipod-modding/ipod-identifier/ipod-5-gen.png",
  5.5: "/posts/ipod-modding/ipod-identifier/ipod-5-gen.png",
  6: "/posts/ipod-modding/ipod-identifier/ipod-7-gen.png",
  6.5: "/posts/ipod-modding/ipod-identifier/ipod-7-gen.png",
  7: "/posts/ipod-modding/ipod-identifier/ipod-7-gen.png",
};

const ipodAltMap: Record<Generation, string> = {
  5: "iPod 5th Generation (Video)",
  5.5: "iPod 5.5 Generation (Video Enhanced)",
  6: "iPod Classic 6th Generation",
  6.5: "iPod Classic 6.5 Generation",
  7: "iPod Classic 7th Generation",
};

export const IpodIdentifierResults = ({
  capacity,
  model,
  onRestart,
}: IpodIdentifierResultsProps) => {
  const details = model.capacityOptions.find((option) => option.capacity === capacity);

  return (
    <IpodIdentifierLayout
      image={ipodImageMap[model.generation]}
      imageAlt={ipodAltMap[model.generation]}
      title="Your iPod is"
    >
      {details ? (
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
          <Button center onClick={onRestart}>
            Restart
          </Button>
        </div>
      ) : (
        "Something went wrong"
      )}
    </IpodIdentifierLayout>
  );
};
