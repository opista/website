import { Children, HTMLProps, ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/util/cn";
import { toSlug } from "@/util/to-slug";

import { ConditionalWrapper } from "./conditional-wrapper";
import { LinkIcon } from "./icons/link-icon";

export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const levelClasses = {
  h1: "text-3xl sm:text-7xl font-bold",
  h2: "text-2xl font-semibold",
  h3: "text-xl font-semibold",
  h4: "text-lg font-semibold",
  h5: "text-md font-semibold",
  h6: "text-md font-semibold",
};

export type HeadingProps = HTMLProps<HTMLHeadingElement> & {
  level: HeadingTag;
  link?: boolean;
  spanClassName?: string;
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
  <LinkIcon className="group-hover:text-pink-500 inline-block ml-1" />
);

const formattedChildren = (children: ReactNode, href: string) => {
  if (Children.count(children) <= 1) {
    return (
      <LinkWrapper href={href}>
        {children} <Icon />
      </LinkWrapper>
    );
  }

  const mapped = Children.map(children, (child) => {
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
        <Icon />
      </LinkWrapper>
    </>
  );
};

export const Heading = ({
  children,
  className,
  level: Comp,
  link = false,
  spanClassName,
  ...props
}: HeadingProps) => {
  const slug = toSlug(
    Array.isArray(children)
      ? children
        .filter((child): child is string => typeof child === "string")
        .map((child) => child.trim())
        .join(" ")
      : typeof children === "string" || typeof children === "number"
        ? children
        : ""
  );

  const href = `#${slug}`;

  return (
    <Comp
      {...props}
      className={cn("relative scroll-mt-20", levelClasses[Comp], className)}
      id={slug}
    >
      <span className={cn("group flex items-center gap-2", spanClassName)}>
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
