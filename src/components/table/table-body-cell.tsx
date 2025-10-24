import { TdHTMLAttributes } from "react";
import clsx from "clsx";

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
        "border-r border-(--tw-prose-td-borders)": border,
      },
      className
    )}
  />
);
