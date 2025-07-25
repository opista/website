import clsx from "clsx";

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
      "px-2 py-1 leading-none text-sm rounded-lg uppercase border",
      {
        "font-thin": backplate === "thin",
        "font-black border-2": backplate === "thick",
      },
      className
    )}
  >
    {backplate}
  </span>
);
