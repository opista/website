"use client";

import { CandidateQuestionnaire } from "@/components/questionnaire/candidate-questionnaire";

import {
  DEFAULT_PSP_IDENTIFIER_ANSWERS,
  filterPspModel,
  pspIdentifierQuestions,
  pspModelMap,
} from "./psp-identifier.config";
import { PspIdentifierResults } from "./psp-identifier-results";

export const PspIdentifier = () => (
  <div className="border">
    <div className="p-8 pb-0">
      <h3 className="text-center mt-0 mb-2">PSP Identifier</h3>

      <CandidateQuestionnaire
        candidates={pspModelMap}
        defaultAnswers={DEFAULT_PSP_IDENTIFIER_ANSWERS}
        matchesCandidate={filterPspModel}
        questions={pspIdentifierQuestions}
        renderResults={({ filteredCandidates, onBack, onRestart }) => (
          <PspIdentifierResults model={filteredCandidates[0]} onBack={onBack} onRestart={onRestart} />
        )}
      />
    </div>
  </div>
);
