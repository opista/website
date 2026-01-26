"use client";

import { IconMaximize } from "@tabler/icons-react";
import NextImage, { ImageProps as NextImageProps } from "next/image";

import { cn } from "@/util/cn";

import { Link } from "./link";

type ImageProps = NextImageProps & {
  expandable?: boolean;
};

export const Image = ({
  alt,
  className,
  expandable,
  src,
  ...props
}: ImageProps) => (
  <div className="relative group w-fit mx-auto">
    <NextImage
      alt={alt}
      className={cn("rounded-lg", className)}
      src={src}
      {...props}
    />
    {expandable && (
      <Link
        aria-label="Expand image"
        className="absolute bottom-2 right-2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 no-underline"
        href={src as string}
        target="_blank"
      >
        <IconMaximize
          aria-label="Icon, expand arrows pointing outwards"
          className="size-4"
          stroke={1.5}
        />
      </Link>
    )}
  </div>
);
