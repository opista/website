import { BackplateSize, Capacity, GenerationConfiguration } from "@/components/ipod/ipod.types";
import { AnswerOption, QuestionDefinition } from "@/components/questionnaire/questionnaire.types";

const YEAR_NOT_FOUND = "not-found";
const MODEL_NUMBER_NOT_AVAILABLE = "not-available";
const MODEL_NUMBER_2007_160 = "2007-160gb";
const MODEL_NUMBER_2009_160 = "2009-160gb";

type ModelNumberAnswer =
  | typeof MODEL_NUMBER_2007_160
  | typeof MODEL_NUMBER_2009_160
  | typeof MODEL_NUMBER_NOT_AVAILABLE;
type YearAnswer = number | typeof YEAR_NOT_FOUND;

export type IpodIdentifierAnswers = {
  backplate: BackplateSize | null;
  capacity: Capacity | null;
  hasMetalFaceplate: boolean | null;
  hasSearch: boolean | null;
  modelNumber: ModelNumberAnswer | null;
  year: YearAnswer | null;
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

const BACKPLATE_ORDER: BackplateSize[] = ["thin", "thick"];

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

const getPrintedYearOptions = (
  filteredGenerations: GenerationConfiguration[],
): AnswerOption<number>[] =>
  Array.from(new Set(filteredGenerations.flatMap(({ years }) => years)))
    .sort((a, b) => a - b)
    .map((year) => ({ label: year.toString(), value: year }));

const getYearOptions = (
  filteredGenerations: GenerationConfiguration[],
): AnswerOption<YearAnswer>[] => [
  ...getPrintedYearOptions(filteredGenerations),
  { label: "No year printed", value: YEAR_NOT_FOUND },
];

const getModelNumberOptions = (): AnswerOption<ModelNumberAnswer>[] => [
  {
    label: "Contains 293 or 297",
    value: MODEL_NUMBER_2009_160,
  },
  {
    label: "Contains 145 or 150",
    value: MODEL_NUMBER_2007_160,
  },
  {
    label: "I can't check this",
    value: MODEL_NUMBER_NOT_AVAILABLE,
  },
];

const getBackplateOptions = (
  filteredGenerations: GenerationConfiguration[],
  capacity: Capacity | null,
): AnswerOption<BackplateSize>[] => {
  const availableBackplates = new Set(
    filteredGenerations.flatMap(({ capacityOptions }) =>
      capacityOptions
        .filter((option) => capacity === null || option.capacity === capacity)
        .map(({ backplate }) => backplate),
    ),
  );

  return BACKPLATE_ORDER.filter((backplate) => availableBackplates.has(backplate)).map(
    (backplate) => ({
      label:
        backplate === "thin"
          ? "Thin / slim (about 10-11mm deep)"
          : "Thick / deep (about 13-14mm deep)",
      value: backplate,
    }),
  );
};

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

  if (
    answers.year !== null &&
    answers.year !== YEAR_NOT_FOUND &&
    !generation.years.includes(answers.year)
  ) {
    return false;
  }

  if (answers.modelNumber === MODEL_NUMBER_2009_160 && generation.generation !== 7) {
    return false;
  }

  if (answers.modelNumber === MODEL_NUMBER_2007_160 && generation.generation !== 6) {
    return false;
  }

  if (
    answers.backplate !== null &&
    !generation.capacityOptions.some(
      ({ backplate, capacity }) =>
        backplate === answers.backplate &&
        (answers.capacity === null || capacity === answers.capacity),
    )
  ) {
    return false;
  }

  return true;
};

export const DEFAULT_IPOD_IDENTIFIER_ANSWERS: IpodIdentifierAnswers = {
  backplate: null,
  capacity: null,
  hasMetalFaceplate: null,
  hasSearch: null,
  modelNumber: null,
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
    description: "If your backplate has no printed copyright year, choose the no-year option.",
    image: "/posts/ipod-modding/ipod-identifier/ipod-rear.png",
    imageAlt: "Back of an iPod showing the copyright year",
    key: "year",
    question: "Looking on the back of your iPod, what year does it say?",
    skip: ({ filteredCandidates }) => getPrintedYearOptions(filteredCandidates).length <= 1,
  },
  {
    answers: () => getModelNumberOptions(),
    description:
      "On the iPod, go to Settings > About and press the Center button to cycle screens. The rear-case A1238 number is not specific enough.",
    image: "/posts/ipod-modding/ipod-identifier/ipod-7-gen.png",
    imageAlt: "Front of an iPod classic showing the screen and click wheel",
    key: "modelNumber",
    question: "What model number does Settings > About show?",
    skip: ({ answers }) => answers.year !== YEAR_NOT_FOUND,
  },
  {
    answers: ({ answers, filteredCandidates }) =>
      getBackplateOptions(filteredCandidates, answers.capacity),
    description:
      "Use this only if you cannot check Settings > About. Look at the whole iPod from the side: thin is about 10-11mm deep; thick is about 13-14mm deep.",
    image: "/posts/ipod-modding/ipod-identifier/ipod-rear.png",
    imageAlt: "Back of an iPod showing the rear case depth",
    key: "backplate",
    question: "Which backplate style does your iPod have?",
    skip: ({ answers, filteredCandidates }) =>
      answers.year !== YEAR_NOT_FOUND ||
      answers.modelNumber !== MODEL_NUMBER_NOT_AVAILABLE ||
      getBackplateOptions(filteredCandidates, answers.capacity).length <= 1,
  },
];
