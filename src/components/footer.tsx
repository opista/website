import { IconRss } from "@tabler/icons-react";

import { Link } from "./link";
import { Logo } from "./logo";

const footerLinks = [
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

export const Footer = () => {
  return (
    <footer className="flex flex-col text-center py-6 sm:py-8 text-sm text-gray-400 border-t border-gray-500 sm:text-base mt-16">
      <div className="max-w-prose mx-auto w-full">
        <Logo className="text-xl mb-4" isLink />

        <ul className="mt-4 mb-4">
          {footerLinks.map(({ href, text }) => (
            <li key={text}>
              <Link className="p-1" href={href} hideExternalLinkIcon>
                {text}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          aria-label="RSS Feed"
          className="inline-flex items-center gap-1 text-pink-500 hover:text-pink-400 mb-8"
          href="/feed"
        >
          <IconRss aria-hidden="true" className="size-5" stroke={3} />
          <span className="text-sm">RSS</span>
        </Link>

        <div>© {new Date().getFullYear()} OPISTA. All rights reserved.</div>
      </div>
    </footer>
  );
};
