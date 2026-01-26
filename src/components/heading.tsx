import { IconLink } from "@tabler/icons-react";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/util/cn";
import { toSlug } from "@/util/to-slug";

export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeadingProps = ComponentPropsWithoutRef<HeadingTag> & {
  children: ReactNode;
  level: HeadingTag;
  link?: boolean;
};

export const Heading = ({
  children,
  className,
  id,
  level,
  link = true,
  ...props
}: HeadingProps) => {
  const Tag = level;
  const slug = id ?? toSlug(children?.toString() || "");

  const content = (
    <Tag
      className={cn("scroll-mt-24 group relative", className)}
      id={slug}
      {...props}
    >
      {children}
      {link && (
        <a
          aria-label="Link to this section"
          className="opacity-0 group-hover:opacity-100 transition-opacity absolute -left-6 top-0 p-1 text-zinc-400 hover:text-pink-500"
          href={`#${slug}`}
        >
          <IconLink
            aria-label="Icon, link symbol"
            className="size-4 inline-block"
            stroke={1.5}
          />
        </a>
      )}
    </Tag>
  );

  return content;
};
