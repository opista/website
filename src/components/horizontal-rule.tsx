import { cn } from "@/util/cn";

export type HorizontalRuleProps = {
  className?: string;
};

export const HorizontalRule = ({ className }: HorizontalRuleProps) => (
  <hr className={cn("border-0 h-px bg-zinc-500", className)} />
);
