"use client";

import { useState } from "react";

import { Button } from "@/components/button";

import {
  CandidateQuestionnaireProps,
  NoMatchRenderProps,
  QuestionDefinition,
  QuestionnaireAnswers,
} from "./questionnaire.types";
import { QuestionnaireStepLayout } from "./questionnaire-step-layout";

type PreparedQuestion<TCandidate, TAnswers extends QuestionnaireAnswers> = QuestionDefinition<
  TCandidate,
  TAnswers
> & {
  answerOptions: { label: string; value: unknown }[];
  shouldSkip: boolean;
};

const DefaultNoMatch = <TAnswers extends QuestionnaireAnswers>({
  onBack,
  onRestart,
}: NoMatchRenderProps<TAnswers>) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
    <p className="mt-0 mb-2 text-xl font-bold">No match found</p>
    <p className="mt-0 mb-6 text-sm">Try going back and choosing a different answer.</p>
    <div className="flex gap-2 justify-center">
      <Button className="bg-zinc-500 hover:bg-zinc-600" onClick={onBack}>
        Back
      </Button>
      <Button onClick={onRestart}>Restart</Button>
    </div>
  </div>
);

export const CandidateQuestionnaire = <TCandidate, TAnswers extends QuestionnaireAnswers>({
  candidates,
  defaultAnswers,
  matchesCandidate,
  questions,
  renderNoMatch,
  renderResults,
}: CandidateQuestionnaireProps<TCandidate, TAnswers>) => {
  const [answers, setAnswers] = useState<TAnswers>(defaultAnswers);

  const filteredCandidates = candidates.filter((candidate) => matchesCandidate(candidate, answers));

  const preparedQuestions: PreparedQuestion<TCandidate, TAnswers>[] = questions.map((question) => {
    const context = {
      answers,
      filteredCandidates,
    };
    const answerOptions = question.answers(context).map((answer) => ({
      label: answer.label,
      value: answer.value,
    }));
    const shouldSkip = question.skip?.(context) ?? false;

    return {
      ...question,
      answerOptions,
      shouldSkip,
    };
  });

  const activeQuestion = preparedQuestions.find(
    (question) => !question.shouldSkip && answers[question.key] === null,
  );

  const onAnswer = <TKey extends keyof TAnswers>(
    key: TKey,
    value: NonNullable<TAnswers[TKey]>,
  ) => {
    setAnswers((current) => ({ ...current, [key]: value }));
  };

  const onRestart = () => {
    setAnswers(defaultAnswers);
  };

  const onBack = () => {
    setAnswers((current) => {
      const reversedQuestions = [...questions].reverse();
      const lastAnsweredQuestion = reversedQuestions.find((question) => current[question.key] !== null);

      if (!lastAnsweredQuestion) {
        return current;
      }

      return { ...current, [lastAnsweredQuestion.key]: null };
    });
  };

  const canGoBack = Object.values(answers).some((value) => value !== null);

  if (filteredCandidates.length === 0) {
    if (renderNoMatch) {
      return renderNoMatch({ answers, onBack, onRestart });
    }

    return <DefaultNoMatch answers={answers} onBack={onBack} onRestart={onRestart} />;
  }

  if (activeQuestion) {
    return (
      <QuestionnaireStepLayout
        description={activeQuestion.description}
        image={activeQuestion.image}
        imageAlt={activeQuestion.imageAlt}
        title={activeQuestion.question}
      >
        {activeQuestion.answerOptions.map((answer) => (
          <Button
            key={`${activeQuestion.question}-${String(answer.value)}`}
            onClick={() => onAnswer(activeQuestion.key, answer.value as NonNullable<TAnswers[typeof activeQuestion.key]>)}
          >
            {answer.label}
          </Button>
        ))}
        {canGoBack && (
          <div className="flex w-full justify-center mt-4">
            <Button className="bg-zinc-500 hover:bg-zinc-600" onClick={onBack}>
              Back
            </Button>
          </div>
        )}
      </QuestionnaireStepLayout>
    );
  }

  return renderResults({
    answers,
    filteredCandidates,
    onBack,
    onRestart,
  });
};
