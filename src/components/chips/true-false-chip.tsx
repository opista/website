import { FC } from "react";

import { CheckCircleIcon } from "../icons/check-circle-icon";
import { CrossCircleIcon } from "../icons/cross-circle-icon";
import { IconProps } from "../icons/icon.types";

import { Chip } from "./chip";

type TrueFalseChipProps = {
  className?: string;
  containerClassName?: string;
  isTrue?: boolean;
  label: string;
};

const iconMap: Record<string, FC<IconProps>> = {
  false: CrossCircleIcon,
  true: CheckCircleIcon,
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
