"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/util/cn";

import { Link } from "./link";

type SiteLinksProps = {
  hideContact?: boolean;
};

const siteLinks = [
  {
    href: "/projects",
    text: "projects",
  },
  {
    href: "/posts",
    text: "posts",
  },
  {
    href: "mailto:contact@opista.com",
    text: "contact",
  },
];

export const SiteLinks = ({ hideContact }: SiteLinksProps) => {
  const pathname = usePathname();

  return (
    <div className="text-right text-pink-500">
      {siteLinks
        .filter(({ text }) => !hideContact || text !== "contact")
        .map(({ href, text }, idx, arr) => {
          const isActive = pathname.startsWith(href);
          return (
            <Fragment key={text}>
              {idx !== 0 && (
                <span aria-hidden="true" className="select-none">
                  {String.fromCharCode(0x2022)}
                </span>
              )}
              <Link
                active={isActive}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "p-2 focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:outline-none focus-visible:rounded-sm",
                  {
                    "font-bold underline": isActive,
                    "font-medium": !pathname.startsWith(href),
                    "pr-0": idx === arr.length - 1,
                  },
                )}
                href={href}
                hideExternalLinkIcon
              >
                {text}
              </Link>
            </Fragment>
          );
        })}
    </div>
  );
};
