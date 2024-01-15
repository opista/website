type Props = {
  children: React.ReactNode;
  condition: boolean;
  wrapper: (children: React.ReactNode) => React.ReactNode;
};

export default function ConditionalWrapper({
  children,
  condition,
  wrapper,
}: Props) {
  return condition ? wrapper(children) : children;
}
