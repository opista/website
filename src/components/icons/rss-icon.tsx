import { IconRss } from "@tabler/icons-react";

import { cn } from "@/util/cn";

import { IconProps } from "./icon.types";

export const RssIcon = ({ className,
  strokeWidth = 3,

 ...props}: IconProps) => (
  <IconRss
    {...props}
    aria-label="Icon, RSS feed"
    className={cn("size-4", className)}
    stroke={strokeWidth}
  />
);
