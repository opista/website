import clsx from "clsx";

import { BackplateSize } from "./ipod.types";

type BackplateIndicatorProps = {
  className?: string;
  backplate: BackplateSize;
};

export const BackplateIndicator = ({
  backplate,
  className,
}: BackplateIndicatorProps) => (
  <span
    className={clsx(
      "px-2 leading-none text-sm text-white rounded-b-lg uppercase border border-current",
      {
        "font-thin": backplate === "thin",
        "py-1 font-black border-2": backplate === "thick",
      },
      className
    )}
  >
    {backplate}
  </span>
);
