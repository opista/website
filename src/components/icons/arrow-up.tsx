import clsx from "clsx";

import { IconProps } from "./icon.types";

export const ArrowUp = ({ className, strokeWidth = 1.5 }: IconProps) => (
  <svg
    className={clsx("size-4", className)}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
