import { ReactNode } from "react";

type AccordionProps = {
  children: ReactNode;
  open?: boolean;
  title: ReactNode;
};

export const Accordion = ({ children, open, title }: AccordionProps) => {
  return (
    <details className="border mb-5 p-4" open={open}>
      <summary>{title}</summary>
      <div className="mt-4">{children}</div>
    </details>
  );
};
