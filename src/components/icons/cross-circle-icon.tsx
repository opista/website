import { IconCircleX } from "@tabler/icons-react";

import { cn } from "@/util/cn";

import { IconProps } from "./icon.types";

export const CrossCircleIcon = ({
  className,
  strokeWidth = 1.5,
 ...props}: IconProps) => (
  <IconCircleX
    {...props}
    aria-label="Icon, circle with a cross"
    className={cn("size-4", className)}
    stroke={strokeWidth}
  />
);
