import clsx from "clsx";
import { CheckBadgeIcon } from "./icons/check-badge-icon";

export const RECOMMENDED_BG_COLOR = "bg-yellow-600/20";

type RecommendedBadgeProps = {
  className?: string;
};

export const RecommendedBadge = ({ className }: RecommendedBadgeProps) => (
  <div
    className={clsx("flex items-center text-yellow-600 font-bold", className)}
  >
    <CheckBadgeIcon className="mr-1" />
    Recommended
  </div>
);
