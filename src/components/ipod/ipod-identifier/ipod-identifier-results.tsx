import { Capacity, Generation, GenerationConfiguration } from "@/components/ipod/ipod.types";
import { QuestionnaireResultLayout } from "@/components/questionnaire/questionnaire-result-layout";

import { IpodIdentifierResultsBody } from "./ipod-identifier-results-body";

type IpodIdentifierResultsProps = {
  capacity: Capacity | null;
  model: GenerationConfiguration;
  onBack: () => void;
  onRestart: () => void;
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
  onBack,
  onRestart,
}: IpodIdentifierResultsProps) => (
  <QuestionnaireResultLayout
    image={ipodImageMap[model.generation]}
    imageAlt={ipodAltMap[model.generation]}
    title="Your iPod is"
  >
    <IpodIdentifierResultsBody
      capacity={capacity}
      model={model}
      onBack={onBack}
      onRestart={onRestart}
    />
  </QuestionnaireResultLayout>
);
