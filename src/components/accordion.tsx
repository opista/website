import { ReactNode } from "react";

type AccordionProps = {
  children: ReactNode;
  open?: boolean;
  title: ReactNode;
};

export const Accordion = ({ children, open, title }: AccordionProps) => (
  <details className="border rounded-lg mb-5 p-4 group" open={open}>
    <summary className="cursor-pointer font-semibold select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:rounded-sm marker:text-gray-400 hover:marker:text-pink-500 transition-colors">
      {title}
    </summary>
    <div className="mt-4">{children}</div>
  </details>
);
