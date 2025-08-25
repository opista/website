import clsx from "clsx";

import { Ram } from "./ipod.types";

type RamIndicatorProps = {
  className?: string;
  ram: Ram;
};

export const RamIndicator = ({ className, ram }: RamIndicatorProps) => (
  <span
    className={clsx(
      "inline-block font-bold px-2 py-1 leading-none text-sm rounded-lg",
      className,
      {
        "bg-amber-400 text-amber-950": ram === 32,
        "bg-green-400 text-green-950": ram === 64,
      }
    )}
  >
    {ram}MB RAM
  </span>
);
