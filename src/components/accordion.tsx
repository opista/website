import { ReactNode } from "react";
import { IconChevronDown } from "@tabler/icons-react";

type AccordionProps = {
  children: ReactNode;
  open?: boolean;
  title: ReactNode;
};

export const Accordion = ({ children, open, title }: AccordionProps) => (
  <details className="border mb-5 p-4 group relative" open={open}>
    <summary className="pr-8 cursor-pointer font-semibold select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:rounded-sm list-none">
      {title}
      <IconChevronDown
        aria-hidden="true"
        className="absolute right-4 top-[18px] transition-transform duration-200 group-open:rotate-180"
      />
    </summary>
    <div className="mt-4">{children}</div>
  </details>
);
