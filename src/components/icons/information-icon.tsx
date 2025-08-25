import clsx from "clsx";

import { IconProps } from "./icon.types";

export const InformationIcon = ({
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
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
