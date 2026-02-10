import { IconArrowsMaximize } from "@tabler/icons-react";
import NextImage, { type ImageProps as NextImageProps } from "next/image";

import { cn } from "@/util/cn";

import { ConditionalWrapper } from "./conditional-wrapper";
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
  <ConditionalWrapper
    condition={!!expandable}
    wrapper={(children) => (
      <div className={cn("mx-auto relative group", className)}>
        {children}
        <Link
          aria-label="View full size image"
          className="flex justify-center items-center border border-2 border-current bg-black absolute bottom-[10px] right-[10px] size-10 p-1 max-w-[30%] max-h-[30%] sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition-all"
          href={src as string}
          hideExternalLinkIcon
          openInNewTab
          title="Open image in new tab"
        >
          <IconArrowsMaximize
            aria-hidden="true"
            className="size-auto"
            stroke={1.5}
          />
        </Link>
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
