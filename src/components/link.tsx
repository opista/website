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

  let content = children;
  const ariaLabel = props["aria-label"];

  if (target === "_blank") {
    if (ariaLabel) {
      // If aria-label is present, append the warning to it
      props["aria-label"] = `${ariaLabel} (opens in a new tab)`;
    } else {
      // Otherwise, append a screen-reader-only span to the children
      content = (
        <>
          {children}
          <span className="sr-only">&nbsp;(opens in a new tab)</span>
        </>
      );
    }
  }

  return (
    <NextLink
      {...props}
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
