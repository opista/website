import clsx from "clsx";
import { ThHTMLAttributes } from "react";

export const TableHeadCell = ({
  className,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) => (
  <th {...props} className={clsx("whitespace-nowrap p-4", className)} />
);
