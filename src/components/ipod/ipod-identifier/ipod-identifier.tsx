"use client";

import { Button } from "@/components/button";
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
        renderResults={({ answers, filteredCandidates, onBack, onRestart }) => {
          const model = filteredCandidates.length === 1 ? filteredCandidates[0] : null;

          if (!model) {
            return (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <p className="mt-0 mb-2 text-xl font-bold">More than one match found</p>
                <p className="mt-0 mb-6 text-sm">Try going back and choosing another answer.</p>
                <div className="flex gap-2 justify-center">
                  <Button className="bg-zinc-500 hover:bg-zinc-600" onClick={onBack}>
                    Back
                  </Button>
                  <Button onClick={onRestart}>Restart</Button>
                </div>
              </div>
            );
          }

          return (
            <IpodIdentifierResults
              capacity={answers.capacity}
              model={model}
              onBack={onBack}
              onRestart={onRestart}
            />
          );
        }}
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
