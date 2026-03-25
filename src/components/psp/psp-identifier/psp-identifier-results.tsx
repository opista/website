import { PspConfiguration } from "@/components/psp/psp.types";
import { QuestionnaireResultLayout } from "@/components/questionnaire/questionnaire-result-layout";

import { PspIdentifierResultsBody } from "./psp-identifier-results-body";

type PspIdentifierResultsProps = {
  model: PspConfiguration;
  onBack: () => void;
  onRestart: () => void;
};

export const PspIdentifierResults = ({ model, onBack, onRestart }: PspIdentifierResultsProps) => (
  <QuestionnaireResultLayout title="Your PSP is">
    <PspIdentifierResultsBody model={model} onBack={onBack} onRestart={onRestart} />
  </QuestionnaireResultLayout>
);
