"use client";

import { HTMLAttributes } from "react";
import { IconLoader2 } from "@tabler/icons-react";
import Link from "next/link";

import { cn } from "@/util/cn";
import { isInternalLink } from "@/util/is-external-link";
import { sanitizeUrl } from "@/util/sanitize-url";

type ButtonProps = {
  center?: boolean;
  disabled?: boolean;
  href?: string;
  isLoading?: boolean;
  noPadding?: boolean;
};

export const Button = ({
  center,
  children,
  className,
  disabled,
  href,
  isLoading,
  noPadding,
  ...props
}: HTMLAttributes<HTMLElement> & ButtonProps) => {
  const { "aria-label": ariaLabel, ...restProps } = props;

  const isDisabled = disabled || isLoading;

  const commonClasses = cn(
    "not-prose cursor-pointer select-none inline-flex items-center justify-center gap-2 text-white no-underline font-medium rounded-lg text-sm bg-blue-600 hover:bg-blue-700 focus:outline-0 focus-visible:ring-2 focus-visible:ring-pink-500 ring-offset-2 ring-offset-zinc-950 transition-colors",
    {
      "cursor-not-allowed opacity-50 pointer-events-none": isDisabled,
      "px-5 py-2.5": !noPadding,
    },
    className,
  );

  let content;

  const spinner = isLoading ? (
    <IconLoader2 aria-hidden="true" className="animate-spin size-5" />
  ) : null;

  if (href) {
    const isInternal = isInternalLink(href);
    const isExternal = !isInternal;
    const linkAriaLabel = isExternal && ariaLabel ? `${ariaLabel} (opens in a new tab)` : ariaLabel;
    const safeHref = sanitizeUrl(href);

    content = (
      <Link
        aria-disabled={isDisabled ? "true" : undefined}
        aria-label={linkAriaLabel}
        className={commonClasses}
        href={safeHref || "#"}
        rel={isInternal ? undefined : "noopener noreferrer"}
        tabIndex={isDisabled ? -1 : undefined}
        target={isInternal ? undefined : "_blank"}
        {...restProps}
      >
        {spinner}
        {children}
        {isExternal && !ariaLabel && <span className="sr-only">&nbsp;(opens in a new tab)</span>}
      </Link>
    );
  } else {
    content = (
      <button
        aria-busy={isLoading}
        aria-label={ariaLabel}
        className={commonClasses}
        disabled={isDisabled}
        type="button"
        {...restProps}
      >
        {spinner}
        {children}
      </button>
    );
  }

  return <div className={cn("flex", { "justify-center": center })}>{content}</div>;
};
