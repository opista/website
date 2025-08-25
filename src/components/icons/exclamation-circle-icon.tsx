import clsx from "clsx";

import { IconProps } from "./icon.types";

export const ExclamationCircleIcon = ({
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
      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
