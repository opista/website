import clsx from "clsx";
import NextLink from "next/link";
import { HTMLProps } from "react";
import type { ComponentPropsWithoutRef } from "react";

type LinkProps = ComponentPropsWithoutRef<typeof NextLink>;

export const Link = (props: LinkProps) => (
  <NextLink
    {...props}
    className={clsx(
      props.className,
      "decoration-wavy no-underline hover:underline text-pink-400 hover:text-pink-600"
    )}
  />
);
