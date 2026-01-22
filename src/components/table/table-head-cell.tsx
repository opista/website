import { ThHTMLAttributes } from "react";

import { cn } from "@/util/cn";

type TableHeadCellProps = {
  border?: boolean;
};

export const TableHeadCell = ({
  border,
  className,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement> & TableHeadCellProps) => (
  <th
    {...props}
    className={cn(
      "whitespace-nowrap p-4",
      {
        "border-r border-(--tw-prose-td-borders)": border,
      },
      className
    )}
  />
);
