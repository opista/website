import { Capacity, GenerationConfiguration } from "@/components/ipod/ipod.types";
import { AnswerOption, QuestionDefinition } from "@/components/questionnaire/questionnaire.types";

export type IpodIdentifierAnswers = {
  capacity: Capacity | null;
  hasMetalFaceplate: boolean | null;
  hasSearch: boolean | null;
  year: number | null;
};

const YES_NO_OPTIONS: AnswerOption<boolean>[] = [
  {
    label: "Yes",
    value: true,
  },
  {
    label: "No",
    value: false,
  },
];

export const generationMap: GenerationConfiguration[] = [
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

const getCapacityOptions = (
  filteredGenerations: GenerationConfiguration[],
): AnswerOption<Capacity>[] =>
  Array.from(
    new Set(
      filteredGenerations
        .flatMap(({ capacityOptions }) => capacityOptions)
        .map(({ capacity }) => capacity),
    ),
  )
    .sort((a, b) => a - b)
    .map((capacity) => ({ label: `${capacity}GB`, value: capacity }));

const getYearOptions = (filteredGenerations: GenerationConfiguration[]): AnswerOption<number>[] =>
  Array.from(new Set(filteredGenerations.flatMap(({ years }) => years)))
    .sort((a, b) => a - b)
    .map((year) => ({ label: year.toString(), value: year }));

export const filterGeneration = (
  generation: GenerationConfiguration,
  answers: IpodIdentifierAnswers,
) => {
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

export const DEFAULT_IPOD_IDENTIFIER_ANSWERS: IpodIdentifierAnswers = {
  capacity: null,
  hasMetalFaceplate: null,
  hasSearch: null,
  year: null,
};

export const ipodIdentifierQuestions: QuestionDefinition<
  GenerationConfiguration,
  IpodIdentifierAnswers
>[] = [
  {
    answers: () => YES_NO_OPTIONS,
    image: "/posts/ipod-modding/ipod-identifier/ipod-7-gen.png",
    imageAlt: "Close up of an iPod with a metal faceplate",
    key: "hasMetalFaceplate",
    question: "Does your iPod have a metal faceplate?",
    skip: () => false,
  },
  {
    answers: ({ filteredCandidates }) => getCapacityOptions(filteredCandidates),
    image: "/posts/ipod-modding/ipod-identifier/ipod-rear.png",
    imageAlt: "Back of an iPod showing capacity text",
    key: "capacity",
    question: "Looking on the back of your iPod, what storage capacity does it have?",
    skip: ({ filteredCandidates }) => getCapacityOptions(filteredCandidates).length <= 1,
  },
  {
    answers: () => YES_NO_OPTIONS,
    image: "/posts/ipod-modding/ipod-identifier/ipod-5-gen-search.png",
    imageAlt: "iPod menu showing the Search option",
    key: "hasSearch",
    question: 'Does your iPod have a "Search" option in the "Music" menu?',
    skip: ({ filteredCandidates }) =>
      filteredCandidates.length <= 1 ||
      filteredCandidates.every(
        ({ hasSearch }) => hasSearch === filteredCandidates[0].hasSearch,
      ),
  },
  {
    answers: ({ filteredCandidates }) => getYearOptions(filteredCandidates),
    image: "/posts/ipod-modding/ipod-identifier/ipod-rear.png",
    imageAlt: "Back of an iPod showing the copyright year",
    key: "year",
    question: "Looking on the back of your iPod, what year does it say?",
    skip: ({ filteredCandidates }) => getYearOptions(filteredCandidates).length <= 1,
  },
];
