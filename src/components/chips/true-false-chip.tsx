import { FC } from "react";
import { IconCircleCheckFilled, IconCircleXFilled, IconProps } from "@tabler/icons-react";

import { Chip } from "./chip";

type TrueFalseChipProps = {
  className?: string;
  containerClassName?: string;
  isTrue?: boolean;
  label: string;
};

const iconMap: Record<string, FC<IconProps>> = {
  false: IconCircleXFilled,
  true: IconCircleCheckFilled,
};

export const TrueFalseChip = ({
  className,
  containerClassName,
  isTrue = false,
  label,
}: TrueFalseChipProps) => (
  <Chip
    className={className}
    color={isTrue ? "green" : "red"}
    containerClassName={containerClassName}
    icon={iconMap[isTrue.toString()]}
    label={
      <>
        <span className="sr-only">{isTrue ? "Yes: " : "No: "}</span>
        {label}
      </>
    }
  />
);
