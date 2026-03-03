import { ReactNode } from "react";

import { Heading } from "./heading";

export type FaqItemProps = {
  question: string;
  children: ReactNode;
};

export const FaqItem = ({ children, question }: FaqItemProps) => (
  <div>
    <Heading level="h4">{question}</Heading>
    {children}
  </div>
);
