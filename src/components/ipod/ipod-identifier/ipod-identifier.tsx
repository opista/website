"use client";

import { useState } from "react";

import { Button } from "../../button";
import { Capacity, GenerationConfiguration } from "../ipod.types";

import { IpodIdentifierLayout } from "./ipod-identifier-layout";
import { IpodIdentifierResults } from "./ipod-identifier-results";

const generationMap: GenerationConfiguration[] = [
  {
    capacityOptions: [
      { backplate: "thin", capacity: 30, ram: 32 },
      { backplate: "thick", capacity: 60, ram: 64 },
    ],
    generation: 5,
    hasMetalFaceplate: false,
    hasSearch: false,
    years: [2005],
  },
  {
    capacityOptions: [
      { backplate: "thin", capacity: 30, ram: 32 },
      { backplate: "thick", capacity: 80, ram: 64 },
    ],
    generation: 5.5,
    hasMetalFaceplate: false,
    hasSearch: true,
    years: [2006],
  },
  {
    capacityOptions: [
      { backplate: "thin", capacity: 80, ram: 64 },
      { backplate: "thick", capacity: 160, ram: 64 },
    ],
    generation: 6,
    hasMetalFaceplate: true,
    hasSearch: true,
    years: [2007],
  },
  {
    capacityOptions: [{ backplate: "thin", capacity: 120, ram: 64 }],
    generation: 6.5,
    hasMetalFaceplate: true,
    hasSearch: true,
    years: [2008],
  },
  {
    capacityOptions: [{ backplate: "thin", capacity: 160, ram: 64 }],
    generation: 7,
    hasMetalFaceplate: true,
    hasSearch: true,
    years: [2009, 2010, 2011, 2012, 2013, 2014, 2015],
  },
];

type AnswerState = {
  hasMetalFaceplate: boolean | null;
  hasSearch: boolean | null;
  capacity: Capacity | null;
  year: number | null;
};

type Question = {
  key: keyof AnswerState;
  image: string;
  question: string;
  answers: { label: string; value: unknown }[];
  skip: () => boolean;
};

const filterGeneration = (generation: GenerationConfiguration, answers: AnswerState) => {
  if (
    answers.hasMetalFaceplate !== null &&
    generation.hasMetalFaceplate !== answers.hasMetalFaceplate
  ) {
    return false;
  }

  if (answers.hasSearch !== null && generation.hasSearch !== answers.hasSearch) {
    return false;
  }

  if (
    answers.capacity !== null &&
    !generation.capacityOptions.find(({ capacity }) => capacity === answers.capacity)
  ) {
    return false;
  }

  if (answers.year !== null && !generation.years.includes(answers.year)) {
    return false;
  }

  return true;
};

const DEFAULT_ANSWER_STATE: AnswerState = {
  capacity: null,
  hasMetalFaceplate: null,
  hasSearch: null,
  year: null,
};

export const IpodIdentifier = () => {
  const [answers, setAnswers] = useState<AnswerState>(DEFAULT_ANSWER_STATE);

  const capacityOptions = Array.from(
    new Set(
      generationMap
        .filter((generation) => filterGeneration(generation, answers))
        .flatMap(({ capacityOptions }) => capacityOptions)
        .map(({ capacity }) => capacity),
    ),
  )
    .sort((a, b) => a - b)
    .map((capacity) => ({ label: `${capacity}GB`, value: capacity }));

  const yearOptions = generationMap
    .filter((generation) => filterGeneration(generation, answers))
    .flatMap(({ years }) => years)
    .sort((a, b) => a - b)
    .map((year) => ({ label: year.toString(), value: year }));

  const filteredGenerations = generationMap.filter((generation) =>
    filterGeneration(generation, answers),
  );

  const steps: Question[] = [
    {
      answers: [
        {
          label: "Yes",
          value: true,
        },
        {
          label: "No",
          value: false,
        },
      ],
      image: "/posts/ipod-modding/ipod-identifier/ipod-7-gen.png",
      key: "hasMetalFaceplate",
      question: "Does your iPod have a metal faceplate?",
      skip: () => false,
    },
    {
      answers: capacityOptions,
      image: "/posts/ipod-modding/ipod-identifier/ipod-rear.png",
      key: "capacity",
      question: "Looking on the back of your iPod, what storage capacity does it have?",
      skip: () => capacityOptions.length <= 1,
    },
    {
      answers: [
        {
          label: "Yes",
          value: true,
        },
        {
          label: "No",
          value: false,
        },
      ],
      image: "/posts/ipod-modding/ipod-identifier/ipod-5-gen-search.png",
      key: "hasSearch",
      question: 'Does your iPod have a "Search" option in the "Music" menu?',
      skip: () =>
        filteredGenerations.every(
          ({ hasSearch }) => hasSearch === filteredGenerations[0].hasSearch,
        ),
    },
    {
      answers: yearOptions,
      image: "/posts/ipod-modding/ipod-identifier/ipod-rear.png",
      key: "year",
      question: "Looking on the back of your iPod, what year does it say?",
      skip: () => yearOptions.length <= 1,
    },
  ];

  const filteredSteps = steps.filter(({ key, skip }) => !skip() && answers[key] === null);
  const step = filteredSteps[0];

  const onAnswer = (key: keyof AnswerState, value: unknown) => {
    setAnswers({ ...answers, [key]: value });
  };

  const onRestart = () => {
    setAnswers(DEFAULT_ANSWER_STATE);
  };

  return (
    <div className="border">
      <div className="p-8 pb-0">
        <h3 className="text-center mt-0 mb-2">iPod Identifier</h3>

        {step ? (
          <IpodIdentifierLayout title={step.question} image={step.image}>
            {step.answers.map((answer) => (
              <Button
                key={`${step.question}-${String(answer.value)}`}
                onClick={() => onAnswer(step.key, answer.value)}
              >
                {answer.label}
              </Button>
            ))}
          </IpodIdentifierLayout>
        ) : (
          <IpodIdentifierResults
            capacity={answers.capacity}
            model={filteredGenerations[0]}
            onRestart={onRestart}
          />
        )}
      </div>

      <div className="text-right text-xs">
        <p className="mb-2 mr-2">
          Thanks to <span className="font-bold">ConiShadow</span> in the iPod Discord server for
          supplying the graphics!
        </p>
      </div>
    </div>
  );
};
