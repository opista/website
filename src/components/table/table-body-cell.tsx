import clsx from "clsx";
import { TdHTMLAttributes } from "react";

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
    className={clsx(
      "p-4",
      {
        "border-r border-[var(--tw-prose-td-borders)]": border,
      },
      className
    )}
  />
);
