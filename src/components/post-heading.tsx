"use client";

import slugify from "slugify";
import Heading from "./heading";
import clsx from "clsx";
import { toSlug } from "@/util/to-slug";
import { LinkIcon } from "./icons/link-icon";

export type PostHeadingProps = {
  children: string;
  className?: string;
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export default function PostHeading({
  children,
  className,
  level,
}: PostHeadingProps) {
  const slug = toSlug(children);

  return (
    <Heading
      className={clsx("scroll-mt-20 relative", className)}
      id={slug}
      level={level}
    >
      <a
        href={`#${slug}`}
        className="absolute -left-6 top-1/2 -translate-y-1/2 hover:text-pink-600"
      >
        <LinkIcon />
      </a>
      {children}
    </Heading>
  );
}
