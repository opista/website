import clsx from "clsx";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { ConditionalWrapper } from "./conditional-wrapper";
import { isInternalLink } from "@/util/is-external-link";

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
}: HTMLAttributes<HTMLDivElement> & ButtonProps) => (
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
      <div
        className={clsx(
          "cursor-pointer select-none inline-block text-white no-underline bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",
          { "px-5 py-2.5 ": !noPadding },
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ConditionalWrapper>
  </div>
);
