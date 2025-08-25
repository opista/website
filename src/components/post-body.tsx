import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";
import { MDXComponents } from "next-mdx-remote-client";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import remarkGfm from "remark-gfm";

import { PageContent } from "@/lib/pages";

import { Accordion } from "./accordion";
import { Alert } from "./alert";
import { Button } from "./button";
import { Heading, HeadingProps } from "./heading";
import { Image } from "./image";
import { BackplateIndicator } from "./ipod/backplate-indicator";
import { IpodFaceplateOptionsTable5Gen } from "./ipod/ipod-faceplate-options-table-5gen";
import { IpodFaceplateOptionsTable67Gen } from "./ipod/ipod-faceplate-options-table-67gen";
import { IpodIdentifier } from "./ipod/ipod-identifier/ipod-identifier";
import { IpodStorageAdaptorOptionsTable } from "./ipod/ipod-storage-adaptor-options-table";
import { IpodStorageBatteryCompatibilityTable } from "./ipod/ipod-storage-battery-compatibility-table";
import { IpodStorageUpgradeCompatibilityTable } from "./ipod/ipod-storage-upgrade-compatibility-table";
import { RamIndicator } from "./ipod/ram-indicator";
import { Link } from "./link";
import { RecommendedBadge } from "./recommended-badge";
import { Table } from "./table/table";
import { TableBodyCell } from "./table/table-body-cell";
import { TableHeadCell } from "./table/table-head-cell";
import { TableOfContents } from "./table-of-contents";
import { UnorderedList } from "./unordered-list";
import { WorkInProgress } from "./work-in-progress";
import { YoutubeEmbed } from "./youtube-embed";

type PostBodyProps = {
  page: PageContent;
};

const headings = Array(6)
  .fill(null)
  .reduce((acc, _curr, idx) => {
    const level = idx + 1;
    const tag = `h${level}` as HeadingProps["level"];
    return {
      ...acc,
      [tag]: (props: HeadingProps) => (
        <Heading {...props} level={tag} link={level <= 4} />
      ),
    };
  }, {});

export const PostBody = ({ page }: PostBodyProps) => {
  const components: MDXComponents = {
    a: Link,
    Accordion,
    BackplateIndicator,
    Button,
    Alert,
    AppLinkButton: (props) => (
      <Button
        {...props}
        center
        className={clsx("mx-auto", props.className)}
        href={page.link}
      >
        {props.children || page.cta}
      </Button>
    ),
    ...headings,
    Image,
    IpodFaceplateOptionsTable5Gen,
    IpodFaceplateOptionsTable67Gen,
    IpodIdentifier,
    IpodStorageAdaptorOptionsTable,
    IpodStorageBatteryCompatibilityTable,
    IpodStorageUpgradeCompatibilityTable,
    Link,
    RamIndicator,
    RecommendedBadge,
    TableOfContents: () => (
      <TableOfContents content={page.content} maxDepth={3} />
    ),
    table: Table,
    th: TableHeadCell,
    td: TableBodyCell,
    ul: UnorderedList,
    WorkInProgress,
    wrapper: ({ children }: ComponentPropsWithoutRef<"div">) => (
      <div className="snap-y markdown">{children}</div>
    ),
    YoutubeEmbed,
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
