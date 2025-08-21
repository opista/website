import { isInternalLink } from "@/util/is-external-link";
import clsx from "clsx";
import NextLink from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type LinkProps = ComponentPropsWithoutRef<typeof NextLink> & {
  openInNewTab?: boolean;
};

export const Link = ({ href, openInNewTab, ...props }: LinkProps) => {
  const isInternal = isInternalLink(href);

  const target = !isInternal || openInNewTab ? "_blank" : undefined;

  return (
    <NextLink
      {...props}
      className={clsx(
        props.className,
        "decoration-wavy no-underline hover:underline text-pink-400 hover:text-pink-600"
      )}
      href={href}
      rel={isInternal ? undefined : "noopener noreferrer"}
      target={target}
    />
  );
};
