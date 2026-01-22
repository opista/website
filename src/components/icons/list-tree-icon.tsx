import { cn } from "@/util/cn";

import { IconProps } from "./icon.types";

export const ListTreeIcon = ({ className, strokeWidth = 2 }: IconProps) => (
  <svg
    aria-label="Icon, list tree"
    className={cn("size-4", className)}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 6h11" />
    <path d="M12 12h8" />
    <path d="M15 18h5" />
    <path d="M5 6v.01" />
    <path d="M8 12v.01" />
    <path d="M11 18v.01" />
  </svg>)