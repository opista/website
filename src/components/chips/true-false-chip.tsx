import { IconCircleCheck, IconCircleX, IconProps } from "@tabler/icons-react";
import { FC } from "react";

import { Chip } from "./chip";

type TrueFalseChipProps = {
  className?: string;
  containerClassName?: string;
  isTrue?: boolean;
  label: string;
};

const iconMap: Record<string, FC<IconProps>> = {
  false: IconCircleX,
  true: IconCircleCheck,
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
    label={label}
  />
);
