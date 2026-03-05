"use client";

import {
  cloneElement,
  HTMLAttributes,
  isValidElement,
  ReactElement,
  ReactNode,
  useId,
} from "react";
import { IconInfoCircleFilled } from "@tabler/icons-react";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { cn } from "@/util/cn";

export type TooltipProps = {
  asChild?: boolean;
  children?: ReactNode;
  className?: string;
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
  asChild,
  children,
  className,
  content,
  offset = 10,
  position = "top",
  variant = "dark",
}: TooltipProps) => {
  const id = useId();

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<HTMLAttributes<HTMLElement>>;
    return (
      <>
        {cloneElement(child, {
          className: cn(child.props.className, className),
          "data-tooltip-content": content,
          "data-tooltip-id": id,
          "data-tooltip-offset": offset,
          "data-tooltip-place": position,
          "data-tooltip-variant": variant,
        })}
        <ReactTooltip className="max-w-[250px] z-50 !text-sm !font-normal" id={id} />
      </>
    );
  }

  if (children) {
    return (
      <>
        <span
          className={cn("inline-block", className)}
          data-tooltip-content={content}
          data-tooltip-id={id}
          data-tooltip-offset={offset}
          data-tooltip-place={position}
          data-tooltip-variant={variant}
        >
          {children}
        </span>
        <ReactTooltip className="max-w-[250px] z-50 !text-sm !font-normal" id={id} />
      </>
    );
  }

  return (
    <>
      <button
        aria-label={content || "More information"}
        className={cn(
          "inline-block appearance-none bg-transparent border-none p-0 cursor-help align-middle focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:outline-none focus-visible:rounded-full",
          className,
        )}
        data-tooltip-content={content}
        data-tooltip-id={id}
        data-tooltip-offset={offset}
        data-tooltip-place={position}
        data-tooltip-variant={variant}
        type="button"
      >
        <IconInfoCircleFilled aria-hidden="true" className="size-4" />
      </button>
      <ReactTooltip className="max-w-[250px] z-50 !text-sm !font-normal" id={id} />
    </>
  );
};
