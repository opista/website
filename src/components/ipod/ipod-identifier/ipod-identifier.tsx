"use client";

import { useState } from "react";

import { Button } from "../../button";
import { Capacity, GenerationConfiguration } from "../ipod.types";

import { IpodIdentifierLayout } from "./ipod-identifier-layout";
import { IpodIdentifierResults } from "./ipod-identifier-results";

const generationMap: GenerationConfiguration[] = [
  {
    capacityOptions: [
      { capacity: 30, backplate: "thin", ram: 32 },
      { capacity: 60, backplate: "thick", ram: 64 },
    ],
    generation: 5,
    hasSearch: false,
    hasMetalFaceplate: false,
    years: [2005],
  },
  {
    capacityOptions: [
      { capacity: 30, backplate: "thin", ram: 32 },
      { capacity: 80, backplate: "thick", ram: 64 },
    ],
    generation: 5.5,
    hasSearch: true,
    hasMetalFaceplate: false,
    years: [2006],
  },
  {
    capacityOptions: [
      { capacity: 80, backplate: "thin", ram: 64 },
      { capacity: 160, backplate: "thick", ram: 64 },
    ],
    generation: 6,
    hasSearch: true,
    hasMetalFaceplate: true,
    years: [2007],
  },
  {
    capacityOptions: [{ capacity: 120, backplate: "thin", ram: 64 }],
    generation: 6.5,
    hasSearch: true,
    hasMetalFaceplate: true,
    years: [2008],
  },
  {
    capacityOptions: [{ capacity: 160, backplate: "thin", ram: 64 }],
    generation: 7,
    hasSearch: true,
    hasMetalFaceplate: true,
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

const filterGeneration = (
  generation: GenerationConfiguration,
  answers: AnswerState
) => {
  if (
    answers.hasMetalFaceplate !== null &&
    generation.hasMetalFaceplate !== answers.hasMetalFaceplate
  ) {
    return false;
  }

  if (
    answers.hasSearch !== null &&
    generation.hasSearch !== answers.hasSearch
  ) {
    return false;
  }

  if (
    answers.capacity !== null &&
    !generation.capacityOptions.find(
      ({ capacity }) => capacity === answers.capacity
    )
  ) {
    return false;
  }

  if (answers.year !== null && !generation.years.includes(answers.year)) {
    return false;
  }

  return true;
};

const DEFAULT_ANSWER_STATE: AnswerState = {
  hasMetalFaceplate: null,
  hasSearch: null,
  capacity: null,
  year: null,
};

export const IpodIdentifier = () => {
  const [answers, setAnswers] = useState<AnswerState>(DEFAULT_ANSWER_STATE);

  const capacityOptions = generationMap
    .filter((generation) => filterGeneration(generation, answers))
    .flatMap(({ capacityOptions }) => capacityOptions)
    .map(({ capacity }) => capacity)
    .filter((option, idx, arr) => arr.indexOf(option) == idx)
    .sort((a, b) => a - b)
    .map((capacity) => ({ label: `${capacity}GB`, value: capacity }));

  const yearOptions = generationMap
    .filter((generation) => filterGeneration(generation, answers))
    .flatMap(({ years }) => years)
    .sort((a, b) => a - b)
    .map((year) => ({ label: year.toString(), value: year }));

  const filteredGenerations = generationMap.filter((generation) =>
    filterGeneration(generation, answers)
  );

  const steps: Question[] = [
    {
      key: "hasMetalFaceplate",
      image: "/posts/ipod-modding/ipod-identifier/ipod-7-gen.png",
      question: "Does your iPod have a metal faceplate?",
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
      skip: () => false,
    },
    {
      key: "capacity",
      question:
        "Looking on the back of your iPod, what storage capacity does it have?",
      image: "/posts/ipod-modding/ipod-identifier/ipod-rear.png",
      answers: capacityOptions,
      skip: () => capacityOptions.length <= 1,
    },
    {
      key: "hasSearch",
      question: 'Does your iPod have a "Search" option in the "Music" menu?',
      image: "/posts/ipod-modding/ipod-identifier/ipod-5-gen-search.png",
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
      skip: () =>
        filteredGenerations.every(
          ({ hasSearch }) => hasSearch === filteredGenerations[0].hasSearch
        ),
    },
    {
      key: "year",
      question: "Looking on the back of your iPod, what year does it say?",
      image: "/posts/ipod-modding/ipod-identifier/ipod-rear.png",
      answers: yearOptions,
      skip: () => yearOptions.length <= 1,
    },
  ];

  const filteredSteps = steps.filter(
    ({ key, skip }) => !skip() && answers[key] === null
  );
  const step = filteredSteps[0];

  const onAnswer = (key: keyof AnswerState, value: any) => {
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
                key={`${step.question}-${answer.value}`}
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
          Thanks to <span className="font-bold">ConiShadow</span> in the iPod
          Discord server for supplying the graphics!
        </p>
      </div>
    </div>
  );
};
