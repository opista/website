import clsx from "clsx";
import NextLink from "next/link";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { isInternalLink } from "@/util/is-external-link";

type LinkProps = ComponentPropsWithoutRef<typeof NextLink> & {
  openInNewTab?: boolean;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, openInNewTab, ...props }, ref) => {
    const isInternal = isInternalLink(href);

    const target = !isInternal || openInNewTab ? "_blank" : undefined;
    const rel = target === "_blank" ? "noopener noreferrer" : undefined;

    return (
      <NextLink
        {...props}
        ref={ref}
        className={clsx(
          props.className,
          "link decoration-wavy no-underline hover:underline text-pink-400 hover:text-pink-500"
        )}
        href={href}
        rel={rel}
        target={target}
      />
    );
  }
);

Link.displayName = "Link";
