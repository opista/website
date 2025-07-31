import clsx from "clsx";
import { HTMLAttributes } from "react";

type TableProps = {
  containerClassName?: string;
};

export const Table = ({
  className,
  containerClassName,
  ...props
}: HTMLAttributes<HTMLTableElement> & TableProps) => (
  <div className={clsx("overflow-auto mb-8", containerClassName)}>
    <table
      {...props}
      className={clsx("border w-full table-fixed m-0 min-w-max", className)}
    />
  </div>
);
