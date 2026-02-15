import { isValidElement, ReactNode } from "react";

export const getTextContent = (children: ReactNode): string => {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getTextContent).join("");
  }

  if (isValidElement(children)) {
    if (children.type === "sup") {
      return "";
    }
    const props = children.props as { children?: ReactNode };
    if (props.children) {
      return getTextContent(props.children);
    }
  }

  return "";
};
