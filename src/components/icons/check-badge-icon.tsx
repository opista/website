import { IconRosetteDiscountCheck } from "@tabler/icons-react";

import { cn } from "@/util/cn";

import { IconProps } from "./icon.types";

export const CheckBadgeIcon = ({ className, strokeWidth = 1.5, ...props}: IconProps) => (
  <IconRosetteDiscountCheck
    {...props}
    aria-label="Icon, badge with a tick"
    className={cn("size-4", className)}
    stroke={strokeWidth}
  />
);
