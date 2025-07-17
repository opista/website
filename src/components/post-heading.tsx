"use client";

import slugify from "slugify";
import Heading from "./heading";

export type PostHeadingProps = {
  children: string;
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export default function PostHeading({ children, level }: PostHeadingProps) {
  const slug = slugify(children, { lower: true, strict: true });
  const hash = ["#", slug].join("");

  const content =
    level === "h2" ? (
      <a
        className="block no-underline text-inherit group-hover:text-pink-600"
        href={hash}
      >
        {children}
      </a>
    ) : (
      children
    );

  return (
    <Heading className="scroll-mt-20 group" id={slug} level={level}>
      {content}
    </Heading>
  );
}
