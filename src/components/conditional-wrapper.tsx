type ConditionalWrapperProps = {
  children: React.ReactNode;
  condition: boolean;
  wrapper: (children: React.ReactNode) => React.ReactNode;
};

export const ConditionalWrapper = ({
  children,
  condition,
  wrapper,
}: ConditionalWrapperProps) => (condition ? wrapper(children) : children);
