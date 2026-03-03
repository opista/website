import { Children, ComponentProps, Fragment, HTMLProps, ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/util/cn";
import { getTextContent } from "@/util/get-text-content";
import { hasInteractive } from "@/util/has-interactive";
import { toSlug } from "@/util/to-slug";

import { HeadingPermalink } from "./heading-permalink";

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

const LinkWrapper = ({ children, className, ...props }: ComponentProps<typeof Link>) => (
  <Link
    className={cn(
      "group inline-block no-underline focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:outline-none focus-visible:rounded-sm",
      className,
    )}
    {...props}
  >
    {children}
  </Link>
);

export const Heading = ({
  children,
  className,
  level: Comp,
  link = false,
  spanClassName,
  ...props
}: HeadingProps) => {
  const text = getTextContent(children, { excludeTags: ["sup"] });
  const slug = toSlug(text);
  const href = `#${slug}`;

  let content;

  if (link) {
    const childrenArray = Children.toArray(children);
    const hasInteractiveChild = childrenArray.some((child) => hasInteractive(child));

    if (hasInteractiveChild) {
      const groups: {
        content: ReactNode[];
        type: "interactive" | "non-interactive";
      }[] = [];
      let currentGroup: ReactNode[] = [];

      childrenArray.forEach((child) => {
        if (hasInteractive(child)) {
          if (currentGroup.length > 0) {
            groups.push({ content: currentGroup, type: "non-interactive" });
            currentGroup = [];
          }
          groups.push({ content: [child], type: "interactive" });
        } else {
          currentGroup.push(child);
        }
      });

      if (currentGroup.length > 0) {
        groups.push({ content: currentGroup, type: "non-interactive" });
      }

      content = (
        <>
          {groups.map((group, i) =>
            group.type === "non-interactive" ? (
              <LinkWrapper key={i} href={href}>
                {group.content}
              </LinkWrapper>
            ) : (
              <Fragment key={i}>{group.content}</Fragment>
            ),
          )}
          <HeadingPermalink slug={slug} />
        </>
      );
    } else {
      content = (
        <>
          <LinkWrapper href={href}>{children}</LinkWrapper>
          <HeadingPermalink slug={slug} />
        </>
      );
    }
  } else {
    content = children;
  }

  return (
    <Comp
      {...props}
      className={cn("relative scroll-mt-20", levelClasses[Comp], className)}
      id={slug}
    >
      <span className={cn("group inline-flex items-center", spanClassName)}>{content}</span>
    </Comp>
  );
};
