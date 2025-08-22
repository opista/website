import { HTMLProps, ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";

import { toSlug } from "@/util/to-slug";

import { ConditionalWrapper } from "./conditional-wrapper";
import { LinkIcon } from "./icons/link-icon";

type HeadingTags = keyof Pick<
  JSX.IntrinsicElements,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>;

const levelClasses = {
  h1: "text-3xl sm:text-7xl font-bold",
  h2: "text-2xl font-semibold",
  h3: "text-xl font-semibold",
  h4: "text-lg font-semibold",
  h5: "text-md font-semibold",
  h6: "text-md font-semibold",
};

export type HeadingProps = HTMLProps<HTMLHeadingElement> & {
  level: HeadingTags;
  link?: boolean;
};

const LinkWrapper = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => (
  <Link className="inline-block no-underline" href={href}>
    {children}
  </Link>
);

const Icon = () => (
  <LinkIcon className="group-hover:text-pink-600 inline-block ml-1" />
);

const formattedChildren = (children: ReactNode, href: string) => {
  if (!Array.isArray(children)) {
    return (
      <LinkWrapper href={href}>
        {children} <Icon />
      </LinkWrapper>
    );
  }

  const mapped = children.map((child) => {
    if (typeof child === "string") {
      return (
        <LinkWrapper href={href} key={child}>
          {child}
        </LinkWrapper>
      );
    }

    return child;
  });

  return (
    <>
      {mapped}
      <LinkWrapper href={href}>
        <LinkIcon className="group-hover:text-pink-600 inline-block ml-1" />
      </LinkWrapper>
    </>
  );
};

export const Heading = ({
  level: Comp,
  link = false,
  children,
  className,
  ...props
}: HeadingProps) => {
  const slug = toSlug(Array.isArray(children) ? children[0] : children);
  const href = `#${slug}`;

  return (
    <Comp
      {...props}
      className={clsx("relative scroll-mt-20", levelClasses[Comp], className)}
      id={slug}
    >
      <span className="group">
        <ConditionalWrapper
          condition={!!link}
          wrapper={(children) => formattedChildren(children, href)}
        >
          {children}
        </ConditionalWrapper>
      </span>
    </Comp>
  );
};
