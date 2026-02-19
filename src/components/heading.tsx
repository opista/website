import { ComponentProps, HTMLProps } from "react";
import { IconLink } from "@tabler/icons-react";
import Link from "next/link";

import { cn } from "@/util/cn";
import { getTextContent } from "@/util/get-text-content";
import { hasInteractive } from "@/util/has-interactive";
import { toSlug } from "@/util/to-slug";

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
  className,
  ...props
}: ComponentProps<typeof Link>) => (
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

const Icon = () => (
  <IconLink
    aria-hidden="true"
    className="group-hover:text-pink-500 inline-block ml-1"
    size={16}
    stroke={1.5}
  />
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

  const isInteractive = hasInteractive(children);

  let content;

  if (link) {
    if (isInteractive) {
      content = (
        <>
          {children}
          <LinkWrapper aria-label={`Permalink to ${text}`} href={href}>
            <Icon />
          </LinkWrapper>
        </>
      );
    } else {
      content = (
        <LinkWrapper href={href}>
          {children}<Icon />
        </LinkWrapper>
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
      <span className={cn("group inline-flex items-center", spanClassName)}>
        {content}
      </span>
    </Comp>
  );
};
