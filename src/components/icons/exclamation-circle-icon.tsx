import { IconAlertCircle } from "@tabler/icons-react";

import { cn } from "@/util/cn";

import { IconProps } from "./icon.types";

export const ExclamationCircleIcon = ({
  className,
  strokeWidth = 1.5,
 ...props}: IconProps) => (
  <IconAlertCircle
    {...props}
    aria-label="Icon, circle with an exclamation mark"
    className={cn("size-4", className)}
    stroke={strokeWidth}
  />
);
