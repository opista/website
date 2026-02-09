import { IconRosetteDiscountCheck } from "@tabler/icons-react";

import { cn } from "@/util/cn";

export const RECOMMENDED_BG_COLOR = "bg-yellow-600/20";

type RecommendedBadgeProps = {
  className?: string;
};

export const RecommendedBadge = ({ className }: RecommendedBadgeProps) => (
  <div
    className={cn(
      "flex items-center text-yellow-600 font-bold mb-5",
      className
    )}
  >
    <IconRosetteDiscountCheck
      aria-hidden="true"
      className="mr-1 size-4"
      stroke={1.5}
    />
    Recommended
  </div>
);
