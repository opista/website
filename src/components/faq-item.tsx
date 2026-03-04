import { ReactNode } from "react";

import { Heading } from "./heading";

export type FaqItemProps = {
  question: string;
  children: ReactNode;
};

export const FaqItem = ({ children, question }: FaqItemProps) => (
  <>
    <Heading level="h4" link>
      {question}
    </Heading>
    {children}
  </>
);
