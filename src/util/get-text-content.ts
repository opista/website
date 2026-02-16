import { Children, isValidElement, ReactElement, ReactNode } from "react";

export const getTextContent = (
  children: ReactNode,
  options: { excludeTags?: string[] } = {},
): string => {
  let text = "";
  const { excludeTags = [] } = options;

  Children.forEach(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      text += child.toString();
    } else if (isValidElement(child)) {
      if (typeof child.type === "string" && excludeTags.includes(child.type)) {
        return;
      }
      const props = (child as ReactElement<{ children?: ReactNode }>).props;
      if (props.children) {
        text += getTextContent(props.children, options);
      }
    } else if (Array.isArray(child)) {
      text += getTextContent(child, options);
    }
  });

  return text;
};
