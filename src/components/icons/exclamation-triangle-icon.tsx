import { IconAlertTriangle } from "@tabler/icons-react";

import { cn } from "@/util/cn";

import { IconProps } from "./icon.types";

export const ExclamationTriangleIcon = ({
  className,
  strokeWidth = 1.5,
 ...props}: IconProps) => (
  <IconAlertTriangle
    {...props}
    aria-label="Icon, warning symbol"
    className={cn("size-4", className)}
    stroke={strokeWidth}
  />
);
