import { cn } from "@/util/cn";

import { CheckBadgeIcon } from "./icons/check-badge-icon";

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
    <CheckBadgeIcon className="mr-1" />
    Recommended
  </div>
);
