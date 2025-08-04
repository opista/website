import { CheckBadgeIcon } from "./icons/check-badge-icon";

export const RECOMMENDED_BG_COLOR = "bg-yellow-600/20";

export const RecommendedBadge = () => (
  <div className="flex items-center text-yellow-600 font-bold mb-5">
    <CheckBadgeIcon className="mr-1" />
    Recommended
  </div>
);
