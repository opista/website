import { Children, isValidElement, ReactElement, ReactNode } from "react";

interface InteractiveProps {
  children?: ReactNode;
  href?: string;
  onClick?: unknown;
}

export const hasInteractive = (children: ReactNode): boolean => {
  let has = false;

  Children.forEach(children, (child) => {
    if (has) return;

    if (isValidElement(child)) {
      const type = child.type;
      const props = (child as ReactElement<InteractiveProps>).props;

      // Check for standard interactive tags
      if (typeof type === "string") {
        if (
          [
            "a",
            "button",
            "input",
            "select",
            "textarea",
            "details",
            "summary",
          ].includes(type) ||
          props.href ||
          props.onClick
        ) {
          has = true;
          return;
        }
      } else {
        // Check for components that might be interactive
        if (props.href || props.onClick) {
          has = true;
          return;
        }
      }

      if (props.children) {
        if (hasInteractive(props.children)) {
          has = true;
        }
      }
    } else if (Array.isArray(child)) {
      if (hasInteractive(child)) {
        has = true;
      }
    }
  });

  return has;
};
