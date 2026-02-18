import { IconArrowsMaximize } from "@tabler/icons-react";
import NextImage, { type ImageProps as NextImageProps } from "next/image";

import { cn } from "@/util/cn";

import { ConditionalWrapper } from "./conditional-wrapper";
import { Link } from "./link";
import { Tooltip } from "./tooltip";

type ImageProps = NextImageProps & {
  expandable?: boolean;
};

export const Image = ({ alt, className, expandable, src, ...props }: ImageProps) => (
  <ConditionalWrapper
    condition={!!expandable}
    wrapper={(children) => (
      <div className={cn("mx-auto relative group", className)}>
        {children}
        <Tooltip
          className="absolute bottom-[10px] right-[10px] size-10 max-w-[30%] max-h-[30%] sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition-all"
          content="Open image in new tab"
        >
          <Link
            aria-label="View full size image"
            className="flex justify-center items-center p-1 h-full w-full border border-2 border-pink-400 hover:border-pink-500 bg-black"
            href={src as string}
            hideExternalLinkIcon
            openInNewTab
          >
            <IconArrowsMaximize aria-hidden="true" className="size-auto" stroke={1.5} />
          </Link>
        </Tooltip>
      </div>
    )}
  >
    <NextImage
      alt={alt}
      className={cn("mx-auto", className)}
      sizes="(max-width: 650px) 100vw, 650px"
      src={src}
      {...props}
    />
  </ConditionalWrapper>
);
