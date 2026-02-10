import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { IconExternalLink } from "@tabler/icons-react";
import NextLink from "next/link";

import { cn } from "@/util/cn";
import { isInternalLink } from "@/util/is-external-link";
import { sanitizeUrl } from "@/util/sanitize-url";

type LinkProps = ComponentPropsWithoutRef<typeof NextLink> & {
  active?: boolean;
  hideExternalLinkIcon?: boolean;
  openInNewTab?: boolean;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({
    active,
    children,
    hideExternalLinkIcon,
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

    const safeHref = typeof href === "string" ? sanitizeUrl(href) || "#" : href;

    return (
      <NextLink
        {...props}
        aria-label={finalAriaLabel}
        className={cn(
          "transition-colors link decoration-wavy no-underline hover:underline text-pink-400 hover:text-pink-500 focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:outline-none focus-visible:rounded-sm",
          { "text-pink-500": active },
          props.className,
        )}
        href={safeHref}
        ref={ref}
        rel={rel}
        target={target}
      >
        {children}
        {shouldOpenInNewTab && !hideExternalLinkIcon && <IconExternalLink className="inline -mt-[2px] ml-1 size-4" aria-hidden="true" />}
        {shouldOpenInNewTab && !ariaLabel && (
          <span className="relative">
            <span className="sr-only">&nbsp;(opens in a new tab)</span>
          </span>
        )}
      </NextLink>
    );
  });

Link.displayName = "Link";