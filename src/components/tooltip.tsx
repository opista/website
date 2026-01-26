"use client";

import { IconInfoCircle } from "@tabler/icons-react";
import { ReactNode } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { cn } from "@/util/cn";

type TooltipProps = {
  children?: ReactNode;
  className?: string;
  content: string;
};

export const Tooltip = ({ children, className, content }: TooltipProps) => (
  <>
    <button
      className={cn("inline-block align-middle text-zinc-400", className)}
      data-tooltip-content={content}
      data-tooltip-id="tooltip"
      type="button"
    >
      {children || (
        <IconInfoCircle
          aria-label="Icon, information symbol"
          className="size-4"
          stroke={1.5}
        />
      )}
    </button>
    <ReactTooltip
      className="z-50 max-w-xs text-xs"
      id="tooltip"
      place="top"
    />
  </>
);
