import { IconArrowUp } from "@tabler/icons-react";

import { cn } from "@/util/cn";

import { IconProps } from "./icon.types";

export const ArrowUp = ({ className, strokeWidth = 1.5 , ...props}: IconProps) => (
  <IconArrowUp
    {...props}
    aria-label="Icon, arrow pointing up"
    className={cn("size-4", className)}
    stroke={strokeWidth}
  />
);
