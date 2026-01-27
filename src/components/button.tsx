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
            href={safeHref || "#"}
            rel={isInternalLink(href) ? undefined : "noopener noreferrer"}
            target={isInternalLink(href) ? undefined : "_blank"}
          >
            {children}
          </Link>
        )}
      >
        <Tag
          className={cn(
            "cursor-pointer select-none inline-block text-white no-underline focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800",
            { "px-5 py-2.5 ": !noPadding },
            className
          )}
          {...(href ? {} : { type: "button" })}
          {...props}
        >
          {children}
        </Tag>
      </ConditionalWrapper>
    </div>
  );
};
