export type SpeakerLocation = "bottom" | "top";

export type HomeButtonStyle = "text" | "logo";

export type PspModel = 1000 | 2000 | 3000;

export type PspConfiguration = {
  homeButtonStyle: HomeButtonStyle | null;
  model: PspModel;
  speakerLocation: SpeakerLocation;
};
