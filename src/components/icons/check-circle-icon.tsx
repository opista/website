import { IconCircleCheck } from "@tabler/icons-react";

import { cn } from "@/util/cn";

import { IconProps } from "./icon.types";

export const CheckCircleIcon = ({
  className,
  strokeWidth = 1.5,
 ...props}: IconProps) => (
  <IconCircleCheck
    {...props}
    aria-label="Icon, circle with a tick"
    className={cn("size-4", className)}
    stroke={strokeWidth}
  />
);
