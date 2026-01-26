import { IconLink } from "@tabler/icons-react";

import { cn } from "@/util/cn";

import { IconProps } from "./icon.types";

export const LinkIcon = ({ className, strokeWidth = 1.5 , ...props}: IconProps) => (
  <IconLink
    {...props}
    aria-label="Icon, link symbol"
    className={cn("size-4", className)}
    stroke={strokeWidth}
  />
);
