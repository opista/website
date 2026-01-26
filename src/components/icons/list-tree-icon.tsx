import { IconListTree } from "@tabler/icons-react";

import { cn } from "@/util/cn";

import { IconProps } from "./icon.types";

export const ListTreeIcon = ({ className, strokeWidth = 2 , ...props}: IconProps) => (
  <IconListTree
    {...props}
    aria-label="Icon, list tree"
    className={cn("size-4", className)}
    stroke={strokeWidth}
  />
);
