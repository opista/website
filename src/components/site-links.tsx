"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/util/cn";

type SiteLinksProps = {
  hideContact?: boolean;
};

const siteLinks = [
  {
    href: "/apps",
    text: "apps",
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
        .map(({ href, text }, idx, arr) => (
          <Fragment key={text}>
            {idx !== 0 && (
              <span aria-hidden="true" className="select-none">
                {String.fromCharCode(0x2022)}
              </span>
            )}
            <Link
              aria-current={pathname.startsWith(href) ? "page" : undefined}
              className={cn(
                "p-2 hover:underline decoration-2 focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:outline-none focus-visible:rounded-sm",
                {
                  "font-bold underline": pathname.startsWith(href),
                  "font-medium": !pathname.startsWith(href),
                  "pr-0": idx === arr.length - 1,
                }
              )}
              href={href}
            >
              {text}
            </Link>
          </Fragment>
        ))}
    </div>
  );
};
