import { Fragment } from "react";
import { IconChevronRight } from "@tabler/icons-react";

import { Link } from "./link";

export type BreadcrumbsProps = {
  items: { href?: string; label: string }[];
};

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <nav aria-label="Breadcrumb" className="not-prose mb-4 flex items-center text-sm text-zinc-500">
    <ol className="flex items-center flex-wrap m-0 p-0 list-none">
      <li className="flex items-center m-0">
        <Link className="text-zinc-500 hover:text-pink-500 font-medium" href="/">
          Home
        </Link>
      </li>
      {items.map((item, index) => (
        <Fragment key={item.label + index}>
          <li aria-hidden="true" className="flex items-center mx-2 select-none m-0">
            <IconChevronRight className="text-zinc-400" size={14} />
          </li>
          <li className="flex items-center min-w-0 m-0">
            {item.href ? (
              <Link className="text-zinc-500 hover:text-pink-500 font-medium" href={item.href}>
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className="font-medium text-zinc-900 dark:text-zinc-100 truncate max-w-[200px] sm:max-w-[300px]"
                title={item.label}
              >
                {item.label}
              </span>
            )}
          </li>
        </Fragment>
      ))}
    </ol>
  </nav>
);
