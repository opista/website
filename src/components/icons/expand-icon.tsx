import { IconMaximize } from "@tabler/icons-react";

import { cn } from "@/util/cn";

import { IconProps } from "./icon.types";

export const ExpandIcon = ({ className, strokeWidth = 1.5 , ...props}: IconProps) => (
  <IconMaximize
    {...props}
    aria-label="Icon, expand arrows pointing outwards"
    className={cn("size-4", className)}
    stroke={strokeWidth}
  />
);
