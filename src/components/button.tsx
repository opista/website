'use client';

import { HTMLAttributes, KeyboardEvent } from "react";
import clsx from "clsx";
import Link from "next/link";

import { isInternalLink } from "@/util/is-external-link";

import { ConditionalWrapper } from "./conditional-wrapper";

type ButtonProps = {
  center?: boolean;
  href?: string;
  noPadding?: boolean;
  onEnter?: (event: KeyboardEvent<HTMLElement>) => void;
};

export const Button = ({
  center,
  children,
  className,
  href,
  noPadding,
  onEnter,
  ...props
}: HTMLAttributes<HTMLElement> & ButtonProps) => {
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (onEnter && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onEnter(event);
    }
  };

  const Tag = href ? "div" : "button";

  return (
    <div
      className={clsx("flex", {
        "justify-center": center,
      })}
    >
      <ConditionalWrapper
        condition={!!href}
        wrapper={(children) => (
          <Link
            href={href as string}
            target={isInternalLink(href) ? undefined : "_blank"}
          >
            {children}
          </Link>
        )}
      >
        <Tag
          className={clsx(
            "cursor-pointer select-none inline-block text-white no-underline focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800",
            { "px-5 py-2.5 ": !noPadding },
            className
          )}
          onKeyDown={onEnter ? onKeyDown : undefined}
          {...(href ? {} : { type: "button" })}
          {...props}
        >
          {children}
        </Tag>
      </ConditionalWrapper>
    </div>
  );
};
