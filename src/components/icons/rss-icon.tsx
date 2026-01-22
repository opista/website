import clsx from "clsx";

import { IconProps } from "./icon.types";

export const RssIcon = ({ className,
  strokeWidth = 3,

}: IconProps) => (
  <svg
    aria-label="Icon, RSS feed"
    className={clsx("size-4", className)}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <path d="M4 4a16 16 0 0 1 16 16" />
    <path d="M4 11a9 9 0 0 1 9 9" />
  </svg>)