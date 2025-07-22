import { ReactNode } from "react";

type AccordionProps = {
  children: ReactNode;
  title: ReactNode;
};

export const Accordion = ({ children, title }: AccordionProps) => {
  return (
    <details className="border mb-6 p-4">
      <summary>{title}</summary>
      {children}
    </details>
  );
};
