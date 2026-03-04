import { ComponentPropsWithoutRef, FC } from "react";
import { MDXComponents } from "next-mdx-remote-client";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

import { LazyVueWhiteboardComposableDemo } from "@/components/vue-whiteboard-composable/lazy-vue-whiteboard-composable-demo";
import { PageContent } from "@/lib/pages";
import { cn } from "@/util/cn";
import { generateTableOfContents } from "@/util/generate-table-of-contents";

import { Accordion } from "./accordion";
import { Alert } from "./alert";
import { Button } from "./button";
import { SolderingChip } from "./chips/soldering-chip";
import { TrueFalseChip } from "./chips/true-false-chip";
import { Faq } from "./faq";
import { FaqItem } from "./faq-item";
import { Heading, HeadingProps, HeadingTag } from "./heading";
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
import { Pre } from "./pre";
import { ProsConsList } from "./pros-cons-list";
import { RecommendedBadge } from "./recommended-badge";
import { Table } from "./table/table";
import { TableBodyCell } from "./table/table-body-cell";
import { TableHeadCell } from "./table/table-head-cell";
import { TableOfContents } from "./table-of-contents";
import { UnorderedList } from "./unordered-list";
import { VideoEmbed } from "./video-embed";
import { WorkInProgress } from "./work-in-progress";
import { YoutubeEmbed } from "./youtube-embed";

type PostBodyProps = {
  page: PageContent;
};

const headings = Array(6)
  .fill(null)
  .reduce<Record<string, FC<HeadingProps>>>((acc, _curr, idx) => {
    const num = idx + 1;
    const level = `h${num}` as HeadingTag;
    return {
      ...acc,
      [level]: (props: HeadingProps) => <Heading {...props} level={level} link={num <= 4} />,
    };
  }, {});

export const PostBody = ({ page }: PostBodyProps) => {
  const tableOfContents = generateTableOfContents(page.content, 3);
  const components: MDXComponents = {
    a: Link,
    Accordion,
    Alert,
    BackplateIndicator,
    Button,
    ProjectLinkButton: (props: ComponentPropsWithoutRef<typeof Button>) =>
      !!page.link && (
        <Button
          {...props}
          center
          className={cn("mx-auto", props.className)}
          href={page.link}
          key={page.link}
        >
          {props.children || `Try ${page.title}`}
        </Button>
      ),
    ...headings,
    Faq,
    FaqItem,
    Image,
    IpodFaceplateOptionsTable5Gen,
    IpodFaceplateOptionsTable67Gen,
    IpodIdentifier,
    IpodStorageAdaptorOptionsTable,
    IpodStorageBatteryCompatibilityTable,
    IpodStorageUpgradeCompatibilityTable,
    Link,
    pre: Pre,
    ProsConsList,
    RamIndicator,
    RecommendedBadge,
    SolderingChip,
    table: Table,
    TableOfContents: (props) => <TableOfContents {...props} headings={tableOfContents} />,
    td: TableBodyCell,
    th: TableHeadCell,
    TrueFalseChip,
    ul: UnorderedList,
    VideoEmbed,
    VueWhiteboardComposableDemo: LazyVueWhiteboardComposableDemo,
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
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                keepBackground: true,
                theme: "github-dark-high-contrast",
              },
            ],
          ],
          remarkPlugins: [remarkGfm],
        },
      }}
      source={page.content}
    />
  );
};
