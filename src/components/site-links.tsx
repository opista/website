"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

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

export const SiteLinks = () => {
  const pathname = usePathname();

  return (
    <div className="text-right text-pink-600">
      {siteLinks.map(({ href, text }, idx) => (
        <Fragment key={text}>
          {idx !== 0 && String.fromCharCode(0x2022)}
          <Link
            className={clsx("p-2 hover:underline decoration-2", {
              "font-medium": !pathname.startsWith(href),
              "font-bold underline": pathname.startsWith(href),
            })}
            href={href}
          >
            {text}
          </Link>
        </Fragment>
      ))}
    </div>
  );
};
