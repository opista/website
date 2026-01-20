import { type ComponentPropsWithoutRef,forwardRef } from "react";
import clsx from "clsx";
import NextLink from "next/link";

import { isInternalLink } from "@/util/is-external-link";

type LinkProps = ComponentPropsWithoutRef<typeof NextLink> & {
  openInNewTab?: boolean;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({
    children,
    href,
    openInNewTab,
    ...props
  }, ref) => {
    const isInternal = isInternalLink(href);
    const shouldOpenInNewTab = !isInternal || openInNewTab;
    const target = shouldOpenInNewTab ? "_blank" : undefined;
    const rel = shouldOpenInNewTab ? "noopener noreferrer" : undefined;

    const ariaLabel = props["aria-label"];

    const finalAriaLabel =
      shouldOpenInNewTab && ariaLabel
        ? `${ariaLabel} (opens in a new tab)`
        : ariaLabel;

    return (
      <NextLink
        {...props}
        aria-label={finalAriaLabel}
        className={clsx(
          props.className,
          "link decoration-wavy no-underline hover:underline text-pink-400 hover:text-pink-500"
        )}
        href={href}
        ref={ref}
        rel={rel}
        target={target}
      >
        {children}
        {shouldOpenInNewTab && !ariaLabel && (
          <span className="sr-only">&nbsp;(opens in a new tab)</span>
        )}
      </NextLink>
    );
  });

Link.displayName = "Link";