import { Fragment } from "react";
import { IconChevronRight } from "@tabler/icons-react";

import { BASE_SITE_URL } from "@/constant";

import { BreadcrumbListJsonLd } from "./json-ld";
import { Link } from "./link";

export type BreadcrumbsProps = {
  items: { href?: string; label: string }[];
};

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <nav aria-label="Breadcrumb" className="not-prose mb-4 flex items-center text-sm text-zinc-500">
    <BreadcrumbListJsonLd
      items={[
        { label: "Home", url: BASE_SITE_URL },
        ...items.map((item) => ({
          label: item.label,
          ...(item.href ? { url: `${BASE_SITE_URL}${item.href}` } : {}),
        })),
      ]}
    />
    <ol className="flex items-center flex-nowrap m-0 p-0 list-none whitespace-nowrap min-w-0 w-full">
      <li className="flex items-center m-0 shrink-0">
        <Link className="text-zinc-500 hover:text-pink-500 font-medium" href="/">
          Home
        </Link>
      </li>
      {items.map((item, index) => (
        <Fragment key={item.label + index}>
          <li aria-hidden="true" className="flex items-center mx-2 select-none m-0 shrink-0">
            <IconChevronRight aria-hidden="true" className="text-zinc-400" size={14} />
          </li>
          <li
            className={`flex items-center m-0 ${item.href ? "shrink-0" : "min-w-0 flex-1 overflow-hidden"}`}
          >
            {item.href ? (
              <Link className="text-zinc-500 hover:text-pink-500 font-medium" href={item.href}>
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className="font-medium text-zinc-900 dark:text-zinc-100 truncate w-full block"
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
