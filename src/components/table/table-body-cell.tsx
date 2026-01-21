import { TdHTMLAttributes } from "react";
import { cn } from "@/util/cn";

type TableBodyCellProps = {
  border?: boolean;
};

export const TableBodyCell = ({
  border,
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement> & TableBodyCellProps) => (
  <td
    {...props}
    className={cn(
      "p-4",
      {
        "border-r border-(--tw-prose-td-borders)": border,
      },
      className
    )}
  />
);
