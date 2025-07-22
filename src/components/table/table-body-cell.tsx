import clsx from "clsx";
import { TdHTMLAttributes } from "react";

export const TableBodyCell = ({
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) => (
  <td {...props} className={clsx("p-4", className)} />
);
