import clsx from "clsx";

export type HorizontalRuleProps = {
  className?: string;
};

export const HorizontalRule = ({ className }: HorizontalRuleProps) => (
  <hr className={clsx("border-0 h-px bg-zinc-500", className)} />
);
