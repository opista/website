import { HTMLAttributes } from "react";

import { cn } from "@/util/cn";
import { ScrollHint } from "../scroll-hint";

type TableProps = {
  containerClassName?: string;
};

export const Table = ({
  className,
  containerClassName,
  ...props
}: HTMLAttributes<HTMLTableElement> & TableProps) => (
  <ScrollHint containerClassName={cn("mb-8", containerClassName)}>
    <table
      {...props}
      className={cn("border w-full table-fixed m-0! min-w-0", className)}
    />
  </ScrollHint>
);
