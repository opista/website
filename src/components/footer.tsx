"use client";

import { Link } from "./link";
import { Logo } from "./logo";
import { siteLinks } from "./site-links";

export const Footer = () => {
  return (
    <footer className="flex flex-col text-center py-8 text-sm text-gray-400 border-t border-gray-500 sm:text-base">
      <div className="max-w-prose mx-auto w-full">
        <Logo className="text-xl mb-4" isLink />

        <ul className="mt-4 mb-8">
          {siteLinks.map(({ href, text }) => (
            <li key={text}>
              <Link className="p-1" href={href}>
                {text}
              </Link>
            </li>
          ))}
        </ul>

        <div>© {new Date().getFullYear()} OPISTA. All rights reserved.</div>
      </div>
    </footer>
  );
};
