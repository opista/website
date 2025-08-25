import clsx from "clsx";

import { IconProps } from "./icon.types";

export const CrossCircleIcon = ({
  className,
  strokeWidth = 1.5,
}: IconProps) => (
  <svg
    className={clsx("size-4", className)}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
