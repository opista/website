import { IconRosetteDiscountCheck } from "@tabler/icons-react";
import { HTMLAttributes } from "react";

import { cn } from "@/util/cn";

export const RECOMMENDED_BG_COLOR = "bg-green-50 dark:bg-green-900/20";

export const RecommendedBadge = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20",
      className
    )}
    {...props}
  >
    <IconRosetteDiscountCheck
      aria-label="Icon, badge with a tick"
      className="size-4 mr-1"
      stroke={1.5}
    />
    Recommended
  </span>
);
