import { PspConfiguration, SpeakerLocation } from "@/components/psp/psp.types";
import { AnswerOption, QuestionDefinition } from "@/components/questionnaire/questionnaire.types";

export type PspIdentifierAnswers = {
  homeButtonStyle: "text" | "logo" | null;
  speakerLocation: SpeakerLocation | null;
};

const getSpeakerLocationOptions = (
  filteredModels: PspConfiguration[],
): AnswerOption<SpeakerLocation>[] =>
  Array.from(new Set(filteredModels.map(({ speakerLocation }) => speakerLocation))).map(
    (speakerLocation) => ({
      label:
        speakerLocation === "bottom"
          ? "Bottom half"
          : "Top half",
      value: speakerLocation,
    }),
  );

const getHomeButtonStyleOptions = (
  filteredModels: PspConfiguration[],
): AnswerOption<"text" | "logo">[] =>
  Array.from(
    new Set(
      filteredModels
        .map(({ homeButtonStyle }) => homeButtonStyle)
        .filter((homeButtonStyle): homeButtonStyle is "text" | "logo" => homeButtonStyle !== null),
    ),
  ).map((homeButtonStyle) => ({
    label:
      homeButtonStyle === "text"
        ? '"HOME"'
        : "PS logo",
    value: homeButtonStyle,
  }));

export const pspModelMap: PspConfiguration[] = [
  {
    homeButtonStyle: null,
    model: 1000,
    speakerLocation: "bottom",
  },
  {
    homeButtonStyle: "text",
    model: 2000,
    speakerLocation: "top",
  },
  {
    homeButtonStyle: "logo",
    model: 3000,
    speakerLocation: "top",
  },
];

export const DEFAULT_PSP_IDENTIFIER_ANSWERS: PspIdentifierAnswers = {
  homeButtonStyle: null,
  speakerLocation: null,
};

export const filterPspModel = (model: PspConfiguration, answers: PspIdentifierAnswers) => {
  if (answers.speakerLocation !== null && model.speakerLocation !== answers.speakerLocation) {
    return false;
  }

  if (answers.homeButtonStyle !== null && model.homeButtonStyle !== answers.homeButtonStyle) {
    return false;
  }

  return true;
};

export const pspIdentifierQuestions: QuestionDefinition<PspConfiguration, PspIdentifierAnswers>[] = [
  {
    answers: ({ filteredCandidates }) => getSpeakerLocationOptions(filteredCandidates),
    image: "/posts/psp-modding/psp-identifier/speaker-location.png",
    imageAlt: "Comparison of PSP 1000 bottom speakers and PSP 2000/3000 top speakers",
    key: "speakerLocation",
    question: "Where are the speaker holes located?",
  },
  {
    answers: ({ filteredCandidates }) => getHomeButtonStyleOptions(filteredCandidates),
    image: "/posts/psp-modding/psp-identifier/home-button.png",
    imageAlt: "Comparison of the PSP 2000 HOME text button and the PSP 3000 PS logo button",
    key: "homeButtonStyle",
    question: "What is printed on the bottom-left button (under the D-pad)?",
    skip: ({ answers, filteredCandidates }) =>
      answers.speakerLocation === "bottom" || getHomeButtonStyleOptions(filteredCandidates).length <= 1,
  },
];
