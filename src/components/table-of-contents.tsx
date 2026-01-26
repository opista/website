import { IconListTree } from "@tabler/icons-react";

import { cn } from "@/util/cn";

export const FIXED_TOC_WIDTH = 300;

export type Heading = {
  active: boolean;
  children?: Heading[];
  depth: number;
  slug: string;
  title: string;
};

type TableOfContentsProps = {
  headings?: Heading[];
};

export const TableOfContents = ({ headings }: TableOfContentsProps) => {
  if (!headings?.length) return null;

  return (
    <div className="my-8 border rounded-lg p-4 bg-zinc-50 dark:bg-zinc-900 not-prose">
      <div className="flex items-center gap-2 font-bold mb-4 text-lg">
        <IconListTree
          aria-label="Icon, list tree"
          className="w-6 h-6"
          stroke={2}
        />{" "}
        On this page
      </div>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            className={cn("text-sm", {
              "pl-4": heading.depth === 3,
            })}
            key={heading.slug}
          >
            <a
              className="text-zinc-600 hover:text-pink-600 dark:text-zinc-400 dark:hover:text-pink-400 transition-colors"
              href={`#${heading.slug}`}
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
