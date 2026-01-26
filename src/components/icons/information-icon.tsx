import { IconInfoCircle } from "@tabler/icons-react";

import { cn } from "@/util/cn";

import { IconProps } from "./icon.types";

export const InformationIcon = ({
  className,
  strokeWidth = 1.5,
 ...props}: IconProps) => (
  <IconInfoCircle
    {...props}
    aria-label="Icon, information symbol"
    className={cn("size-4", className)}
    stroke={strokeWidth}
  />
);
