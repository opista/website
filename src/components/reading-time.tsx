import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/util/cn";

type ReadingTimeProps = ComponentPropsWithoutRef<"span"> & {
  minutes: number;
};

export const ReadingTime = ({ className, minutes, ...props }: ReadingTimeProps) => {
  return (
    <span className={cn("text-xs text-zinc-500", className)} {...props}>
      {minutes} min read
    </span>
  );
};
