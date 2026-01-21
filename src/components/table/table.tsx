import { HTMLAttributes } from "react";
import { cn } from "@/util/cn";

type TableProps = {
  containerClassName?: string;
};

export const Table = ({
  className,
  containerClassName,
  ...props
}: HTMLAttributes<HTMLTableElement> & TableProps) => (
  <div className={cn("overflow-auto mb-8", containerClassName)}>
    <table
      {...props}
      className={cn("border w-full table-fixed m-0 min-w-0", className)}
    />
  </div>
);
