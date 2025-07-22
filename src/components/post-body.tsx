import { MDXComponents } from "next-mdx-remote-client";

import { Image } from "./image";
import { Button } from "./button";
import { PageContent } from "@/lib/pages";
import { TableOfContents } from "./table-of-contents";
import { Link } from "./link";
import remarkGfm from "remark-gfm";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { ComponentPropsWithoutRef } from "react";
import { Table } from "./table/table";
import { TableHeadCell } from "./table/table-head-cell";
import { TableBodyCell } from "./table/table-body-cell";
import { UnorderedList } from "./unordered-list";
import { IpodDiscovery } from "./ipod/ipod-discovery";
import { Alert } from "./alert";
import { Heading, HeadingProps } from "./heading";
import { IpodStorageUpgradeTable } from "./ipod/ipod-storage-upgrade-table";
import { Accordion } from "./accordion";

type PostBodyProps = {
  page: PageContent;
};

const headings = Array(6)
  .fill(null)
  .reduce((acc, curr, idx) => {
    const level = idx + 1;
    const tag = `h${level}` as const;
    return {
      ...acc,
      [tag]: (props: HeadingProps) => (
        <Heading {...props} level={tag as HeadingProps["level"]} link />
      ),
    };
  }, {});

export const PostBody = ({ page }: PostBodyProps) => {
  const components: MDXComponents = {
    a: Link,
    Accordion,
    Button,
    Alert,
    ...headings,
    img: Image,
    Image,
    IpodDiscovery,
    IpodStorageUpgradeTable,
    TOC: () => <TableOfContents content={page.content} />,
    table: Table,
    th: TableHeadCell,
    td: TableBodyCell,
    ul: UnorderedList,
    wrapper: ({ children }: ComponentPropsWithoutRef<"div">) => (
      <div className="mx-auto max-w-prose snap-y markdown">{children}</div>
    ),
  };

  return (
    <MDXRemote
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
      source={page.content}
    />
  );
};
