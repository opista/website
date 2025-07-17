"use client";

import { hydrate } from "next-mdx-remote-client";

import Link from "next/link";
import PostHeading, { PostHeadingProps } from "./post-heading";
import PostImage from "./post-image";
import LinkButton from "./link-button";

type Props = {
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

const components = {
  a: Link,
  ...headings,
  PostImage,
  LinkButton,
};

export default function PostBody({ source }: Props) {
  const { content } = hydrate({ ...source, components });
  return <div className="mx-auto max-w-prose snap-y markdown">{content}</div>;
}
