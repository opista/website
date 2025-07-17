import clsx from "clsx";
import React, { ElementType, HTMLProps } from "react";

type HeadingTags = keyof Pick<
  JSX.IntrinsicElements,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>;

const fontSize = {
  h1: "text-3xl",
  h2: "text-2xl",
  h3: "text-xl",
  h4: "text-md",
  h5: "text-sm",
  h6: "text-xs",
};

type Props = HTMLProps<HTMLHeadingElement> & {
  level?: HeadingTags;
  as?: ElementType;
};

export default function Heading({
  level = "h1",
  as: Comp = level,
  ...rest
}: Props) {
  const props: HTMLProps<HTMLHeadingElement> = {
    ...rest,
    className: clsx(
      `${fontSize[level]} font-semibold text-slate-800 dark:text-neutral-300`,
      rest.className
    ),
  };

  return <Comp {...props} />;
}
