import clsx from "clsx";
import { HTMLProps } from "react";
import { LinkIcon } from "./icons/link-icon";
import { toSlug } from "@/util/to-slug";

type HeadingTags = keyof Pick<
  JSX.IntrinsicElements,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>;

const levelClasses = {
  h1: "text-3xl sm:text-7xl font-bold",
  h2: "text-2xl font-semibold",
  h3: "text-xl font-semibold",
  h4: "text-md font-semibold",
  h5: "text-sm font-semibold",
  h6: "text-xs font-semibold",
};

export type HeadingProps = HTMLProps<HTMLHeadingElement> & {
  level: HeadingTags;
  link?: boolean;
};

export const Heading = ({
  level: Comp,
  link = false,
  children,
  className,
  ...props
}: HeadingProps) => {
  const slug = toSlug(Array.isArray(children) ? children[0] : children);

  return (
    <Comp
      {...props}
      className={clsx("scroll-mt-20 relative", levelClasses[Comp], className)}
      id={slug}
    >
      {children}
      {link && (
        <a
          href={`#${slug}`}
          className="hidden md:block md:absolute -left-6 top-1/2 md:-translate-y-1/2 hover:text-pink-600"
        >
          <LinkIcon />
        </a>
      )}
    </Comp>
  );
};
