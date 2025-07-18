"use client";

import { hydrate } from "next-mdx-remote-client";

import PostHeading, { PostHeadingProps } from "./post-heading";
import PostImage from "./post-image";
import LinkButton from "./link-button";
import { PageContent } from "@/lib/pages";
import TableOfContents from "./table-of-contents";
import { Link } from "./link";

type Props = {
  page: PageContent;
  source: any;
};

const headings = Array(6)
  .fill(null)
  .reduce((acc, curr, idx) => {
    const level = idx + 1;
    const tag = `h${level}` as const;
    return {
      ...acc,
      [tag]: (props: PostHeadingProps) => (
        <PostHeading {...props} level={tag as PostHeadingProps["level"]} />
      ),
    };
  }, {});

export default function PostBody({ page, source }: Props) {
  const components = {
    a: Link,
    ...headings,
    PostImage,
    LinkButton,
    TOC: () => <TableOfContents content={page.content} />,
  };

  const { content } = hydrate({ ...source, components });
  return <div className="mx-auto max-w-prose snap-y markdown">{content}</div>;
}
