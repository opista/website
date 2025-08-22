import { ThHTMLAttributes } from "react";
import clsx from "clsx";

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
    className={clsx(
      "whitespace-nowrap p-4",
      {
        "border-r border-[var(--tw-prose-td-borders)]": border,
      },
      className
    )}
  />
);
