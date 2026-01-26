import { IconRss } from "@tabler/icons-react";

import { cn } from "@/util/cn";

import { Link } from "./link";

export const Footer = () => (
  <footer className="w-full mt-12 py-10 border-t border-zinc-800 text-center text-zinc-500 text-sm">
    <div className="mb-4">
      <Link
        className="text-pink-600 dark:text-pink-500 font-black text-lg no-underline uppercase tracking-widest hover:bg-transparent"
        href="/"
      >
        Opista
      </Link>
    </div>
    <div className="flex justify-center space-x-4 mb-4">
      <Link href="/apps">apps</Link>
      <Link href="/posts">posts</Link>
      <Link href="mailto:hello@opista.com">contact</Link>
    </div>
    <div className="flex justify-center mb-6">
      <a
        aria-label="RSS Feed"
        className={cn(
          "text-pink-600 dark:text-pink-500 hover:text-pink-700 dark:hover:text-pink-400 transition-colors"
        )}
        href="/feed"
      >
        <IconRss aria-label="Icon, RSS feed" className="size-5" stroke={3} />
      </a>
    </div>
    <div>
      &copy; {new Date().getFullYear()} OPISTA. All rights reserved.
    </div>
  </footer>
);
