'use client';

import { HTMLAttributes } from "react";
import Link from "next/link";

import { cn } from "@/util/cn";
import { isInternalLink } from "@/util/is-external-link";
import { sanitizeUrl } from "@/util/sanitize-url";

import { ConditionalWrapper } from "./conditional-wrapper";

type ButtonProps = {
  center?: boolean;
  href?: string;
  noPadding?: boolean;
};

export const Button = ({
  center,
  children,
  className,
  href,
  noPadding,
  ...props
}: HTMLAttributes<HTMLElement> & ButtonProps) => {
  const Tag = href ? "div" : "button";

  const { "aria-label": ariaLabel, ...restProps } = props;
  const isInternal = isInternalLink(href);
  const isExternal = href && !isInternal;

  const linkAriaLabel =
    isExternal && ariaLabel ? `${ariaLabel} (opens in a new tab)` : ariaLabel;

  const safeHref = sanitizeUrl(href);

  return (
    <div
      className={cn("flex", {
        "justify-center": center,
      })}
    >
      <ConditionalWrapper
        condition={!!href}
        wrapper={(children) => (
          <Link
            aria-label={linkAriaLabel}
            href={safeHref || "#"}
            rel={isInternal ? undefined : "noopener noreferrer"}
            target={isInternal ? undefined : "_blank"}
          >
            {children}
            {isExternal && !ariaLabel && (
              <span className="sr-only">&nbsp;(opens in a new tab)</span>
            )}
          </Link>
        )}
      >
        <Tag
          className={cn(
            "cursor-pointer select-none inline-block text-white no-underline focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800",
            { "px-5 py-2.5 ": !noPadding },
            className
          )}
          {...(href
            ? {}
            : { "aria-label": ariaLabel, type: "button" })}
          {...restProps}
        >
          {children}
        </Tag>
      </ConditionalWrapper>
    </div>
  );
};
