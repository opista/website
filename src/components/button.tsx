'use client';

import { HTMLAttributes } from "react";
import Link from "next/link";

import { cn } from "@/util/cn";
import { isInternalLink } from "@/util/is-external-link";
import { sanitizeUrl } from "@/util/sanitize-url";

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
  const { "aria-label": ariaLabel, ...restProps } = props;

  const commonClasses = cn(
    "cursor-pointer select-none inline-block text-white no-underline focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800",
    { "px-5 py-2.5 ": !noPadding },
    className
  );

  let content;

  if (href) {
    const isInternal = isInternalLink(href);
    const isExternal = !isInternal;
    const linkAriaLabel =
      isExternal && ariaLabel ? `${ariaLabel} (opens in a new tab)` : ariaLabel;
    const safeHref = sanitizeUrl(href);

    content = (
      <Link
        aria-label={linkAriaLabel}
        className={commonClasses}
        href={safeHref || "#"}
        rel={isInternal ? undefined : "noopener noreferrer"}
        target={isInternal ? undefined : "_blank"}
        {...restProps}
      >
        {children}
        {isExternal && !ariaLabel && (
          <span className="sr-only">&nbsp;(opens in a new tab)</span>
        )}
      </Link>
    );
  } else {
    content = (
      <button
        aria-label={ariaLabel}
        className={commonClasses}
        type="button"
        {...restProps}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={cn("flex", { "justify-center": center })}>{content}</div>
  );
};
