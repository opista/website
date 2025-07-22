import clsx from "clsx";
import NextLink from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { UrlObject } from "url";

type LinkProps = ComponentPropsWithoutRef<typeof NextLink>;

const isInternalLink = (url?: string | UrlObject) => {
  if (!url) return false;

  if (typeof url === "string") {
    return url.startsWith("/") || url.startsWith("#");
  }

  return url.href?.startsWith("/") || url.href?.startsWith("#");
};

export const Link = ({ href, ...props }: LinkProps) => {
  const isInternal = isInternalLink(href);
  return (
    <NextLink
      {...props}
      className={clsx(
        props.className,
        "decoration-wavy no-underline hover:underline text-pink-400 hover:text-pink-600"
      )}
      href={href}
      rel={isInternal ? undefined : "noopener noreferrer"}
      target={isInternal ? undefined : "_blank"}
    />
  );
};
