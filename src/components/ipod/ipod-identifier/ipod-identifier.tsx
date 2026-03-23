"use client";

import { CandidateQuestionnaire } from "@/components/questionnaire/candidate-questionnaire";

import {
  DEFAULT_IPOD_IDENTIFIER_ANSWERS,
  filterGeneration,
  generationMap,
  ipodIdentifierQuestions,
} from "./ipod-identifier.config";
import { IpodIdentifierResults } from "./ipod-identifier-results";

export const IpodIdentifier = () => (
  <div className="border">
    <div className="p-8 pb-0">
      <h3 className="text-center mt-0 mb-2">iPod Identifier</h3>

      <CandidateQuestionnaire
        candidates={generationMap}
        defaultAnswers={DEFAULT_IPOD_IDENTIFIER_ANSWERS}
        matchesCandidate={filterGeneration}
        questions={ipodIdentifierQuestions}
        renderResults={({ answers, filteredCandidates, onBack, onRestart }) => (
          <IpodIdentifierResults
            capacity={answers.capacity}
            model={filteredCandidates[0]}
            onBack={onBack}
            onRestart={onRestart}
          />
        )}
      />
    </div>

    <div className="text-right text-xs">
      <p className="mb-2 mr-2">
        Thanks to <span className="font-bold">ConiShadow</span> in the iPod Discord server for
        supplying the graphics!
      </p>
    </div>
  </div>
);
