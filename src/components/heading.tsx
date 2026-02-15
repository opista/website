import { HTMLProps, isValidElement, ReactNode } from "react";
import { IconLink } from "@tabler/icons-react";
import Link from "next/link";

import { cn } from "@/util/cn";
import { getTextContent } from "@/util/get-text-content";
import { toSlug } from "@/util/to-slug";

import { ConditionalWrapper } from "./conditional-wrapper";

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

const LinkWrapper = ({ children, href }: { children: ReactNode; href: string }) => (
  <Link
    className="group inline-block no-underline focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:outline-none focus-visible:rounded-sm"
    href={href}
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

const hasInteractive = (children: ReactNode): boolean => {
  if (Array.isArray(children)) {
    return children.some(hasInteractive);
  }

  if (isValidElement(children)) {
    const type = children.type;

    // Check for standard interactive elements
    if (typeof type === "string") {
      if (["a", "button", "input", "select", "textarea"].includes(type)) {
        return true;
      }
    }

    // Check for component names (Link, Button, AppLinkButton)
    // We check displayName or name property of the component function/object
    const componentType = type as { displayName?: string; name?: string };
    const name = componentType.displayName || componentType.name;
    if (name === "Link" || name === "Button" || name === "AppLinkButton") {
      return true;
    }

    const props = children.props as { children?: ReactNode };
    if (props.children) {
      return hasInteractive(props.children);
    }
  }

  return false;
};

const formattedChildren = (children: ReactNode, href: string) => {
  // If children contain interactive elements, we cannot wrap them in a Link.
  // Instead, we render children as is and append the anchor link icon.
  if (hasInteractive(children)) {
    return (
      <>
        {children}
        <LinkWrapper href={href}>
          <Icon />
        </LinkWrapper>
      </>
    );
  }

  // Otherwise, wrap everything in a single link for better UX/a11y
  return (
    <LinkWrapper href={href}>
      {children} <Icon />
    </LinkWrapper>
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
  const textContent = getTextContent(children);
  const slug = toSlug(textContent);
  const href = `#${slug}`;

  return (
    <Comp
      {...props}
      className={cn("relative scroll-mt-20", levelClasses[Comp], className)}
      id={slug}
    >
      <span className={cn("group inline-flex items-center", spanClassName)}>
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
