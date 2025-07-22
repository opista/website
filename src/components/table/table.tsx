import clsx from "clsx";
import { HTMLAttributes } from "react";

export const Table = ({
  className,
  ...props
}: HTMLAttributes<HTMLTableElement>) => (
  <table {...props} className={clsx("border", className)} />
);
