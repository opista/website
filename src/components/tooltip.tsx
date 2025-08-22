"use client";

import { Tooltip as ReactTooltip } from "react-tooltip";

import { toSlug } from "@/util/to-slug";

import { InformationIcon } from "./icons/information-icon";

export type TooltipProps = {
  content: string;
  offset?: number;
  position?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
  variant?: "dark" | "error" | "info" | "light" | "success" | "warning";
};

export const Tooltip = ({
  content,
  offset = 10,
  position = "top",
  variant = "dark",
}: TooltipProps) => {
  const id = toSlug(content);

  return (
    <>
      <a
        className="inline-block"
        data-tooltip-content={content}
        data-tooltip-id={id}
        data-tooltip-offset={offset}
        data-tooltip-place={position}
        data-tooltip-variant={variant}
      >
        <InformationIcon />
      </a>
      <ReactTooltip id={id} />
    </>
  );
};
