import { ComponentPropsWithoutRef, ElementType } from "react";
import clsx from "clsx";
import Link from "next/link";

import { isInternalLink } from "@/util/is-external-link";

import { ConditionalWrapper } from "./conditional-wrapper";

type ButtonBaseProps = {
  center?: boolean;
  href?: string;
  noPadding?: boolean;
};

// Allow properties from both button and div/anchor since it's polymorphic-ish
type ButtonProps = ButtonBaseProps &
  ComponentPropsWithoutRef<"button"> &
  ComponentPropsWithoutRef<"a">;

export const Button = ({
  center,
  children,
  className,
  href,
  noPadding,
  type = "button",
  ...props
}: ButtonProps) => {
  const isLink = !!href;
  const Tag = (isLink ? "div" : "button") as ElementType;

  return (
    <div
      className={clsx("flex", {
        "justify-center": center,
      })}
    >
      <ConditionalWrapper
        condition={isLink}
        wrapper={(children) => (
          <Link
            href={href as string}
            target={isInternalLink(href!) ? undefined : "_blank"}
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
          type={!isLink ? type : undefined}
          {...props}
        >
          {children}
        </Tag>
      </ConditionalWrapper>
    </div>
  );
};
