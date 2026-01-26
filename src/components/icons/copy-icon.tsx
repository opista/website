import { IconCopy } from "@tabler/icons-react";

import { cn } from "@/util/cn";

import { IconProps } from "./icon.types";

export const CopyIcon = ({ className, strokeWidth = 1.5, ...props }: IconProps) => (
  <IconCopy
    {...props}
    aria-label="Icon, copy to clipboard"
    className={cn("size-4", className)}
    stroke={strokeWidth}
  />
);
