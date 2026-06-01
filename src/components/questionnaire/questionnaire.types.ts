import { ReactNode } from "react";

export type QuestionnaireAnswers = Record<string, unknown | null>;

export type AnswerOption<TValue = unknown> = {
  label: string;
  value: TValue;
};

export type CandidateMatcher<TCandidate, TAnswers extends QuestionnaireAnswers> = (
  candidate: TCandidate,
  answers: TAnswers,
) => boolean;

export type QuestionContext<TCandidate, TAnswers extends QuestionnaireAnswers> = {
  answers: TAnswers;
  filteredCandidates: TCandidate[];
};

export type QuestionDefinition<
  TCandidate,
  TAnswers extends QuestionnaireAnswers,
  TKey extends keyof TAnswers = keyof TAnswers,
> = {
  answers: (
    context: QuestionContext<TCandidate, TAnswers>,
  ) => AnswerOption<NonNullable<TAnswers[TKey]>>[];
  description?: string;
  image: string;
  imageAlt: string;
  key: TKey;
  question: string;
  skip?: (context: QuestionContext<TCandidate, TAnswers>) => boolean;
};

export type ResultRenderProps<TCandidate, TAnswers extends QuestionnaireAnswers> = {
  answers: TAnswers;
  filteredCandidates: TCandidate[];
  onBack: () => void;
  onRestart: () => void;
};

export type NoMatchRenderProps<TAnswers extends QuestionnaireAnswers> = {
  answers: TAnswers;
  onBack: () => void;
  onRestart: () => void;
};

export type CandidateQuestionnaireProps<TCandidate, TAnswers extends QuestionnaireAnswers> = {
  candidates: TCandidate[];
  defaultAnswers: TAnswers;
  matchesCandidate: CandidateMatcher<TCandidate, TAnswers>;
  questions: QuestionDefinition<TCandidate, TAnswers>[];
  renderNoMatch?: (props: NoMatchRenderProps<TAnswers>) => ReactNode;
  renderResults: (props: ResultRenderProps<TCandidate, TAnswers>) => ReactNode;
};
