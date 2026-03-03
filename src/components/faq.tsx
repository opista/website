import { Children, isValidElement, ReactNode } from "react";

import { getTextContent } from "@/util/get-text-content";

import { FaqJsonLd } from "./json-ld";

export type FaqProps = {
  children: ReactNode;
};

export const Faq = ({ children }: FaqProps) => {
  const items: { question: string; answer: string }[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const props = child.props as { children?: ReactNode; question?: string };
      if (props.question) {
        items.push({
          answer: getTextContent(props.children).trim(),
          question: props.question,
        });
      }
    }
  });

  return (
    <>
      <FaqJsonLd items={items} />
      {children}
    </>
  );
};
