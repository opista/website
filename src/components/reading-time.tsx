import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/util/cn";

type ReadingTimeProps = ComponentPropsWithoutRef<"span"> & {
  minutes: number;
};

export const ReadingTime = ({ className, minutes, ...props }: ReadingTimeProps) => {
  return (
    <span className={cn("text-xs", className)} {...props}>
      {minutes} min read
    </span>
  );
};
