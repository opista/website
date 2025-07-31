import { ReactNode } from "react";

type ConditionalWrapperProps = {
  children: ReactNode;
  condition: boolean;
  wrapper: (children: ReactNode) => ReactNode;
};

export const ConditionalWrapper = ({
  children,
  condition,
  wrapper,
}: ConditionalWrapperProps) => (condition ? wrapper(children) : children);
