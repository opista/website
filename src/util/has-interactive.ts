import { Children, isValidElement, ReactNode } from "react";

export const hasInteractive = (children: ReactNode): boolean => {
  let found = false;
  Children.forEach(children, (child) => {
    if (found) return;

    if (isValidElement(child)) {
      // Check standard HTML interactive elements
      if (
        child.type === "a" ||
        child.type === "button" ||
        child.type === "input" ||
        child.type === "select" ||
        child.type === "textarea"
      ) {
        found = true;
        return;
      }

      // Check for props indicating interactivity
      const props = child.props as { href?: string; onClick?: unknown; children?: ReactNode };
      if (props.href || props.onClick) {
        found = true;
        return;
      }

      if (props.children) {
        if (hasInteractive(props.children)) {
          found = true;
        }
      }
    } else if (Array.isArray(child)) {
      if (hasInteractive(child)) {
        found = true;
      }
    }
  });
  return found;
};
