import clsx from "clsx";
import NextLink from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { isInternalLink } from "@/util/is-external-link";

type LinkProps = ComponentPropsWithoutRef<typeof NextLink> & {
  openInNewTab?: boolean;
};

export const Link = ({
  children,
  href,
  openInNewTab,
  ...props
}: LinkProps) => {
  const isInternal = isInternalLink(href);

  const target = !isInternal || openInNewTab ? "_blank" : undefined;
  const rel = target === "_blank" ? "noopener noreferrer" : undefined;

  const ariaLabel = props["aria-label"];
  const shouldWarn = target === "_blank";

  const finalAriaLabel =
    shouldWarn && ariaLabel
      ? `${ariaLabel} (opens in a new tab)`
      : ariaLabel;

  const content =
    shouldWarn && !ariaLabel ? (
      <>
        {children}
        <span className="sr-only">&nbsp;(opens in a new tab)</span>
      </>
    ) : (
      children
    );

  return (
    <NextLink
      {...props}
      aria-label={finalAriaLabel}
      className={clsx(
        props.className,
        "link decoration-wavy no-underline hover:underline text-pink-400 hover:text-pink-500"
      )}
      href={href}
      rel={rel}
      target={target}
    >
      {content}
    </NextLink>
  );
};
