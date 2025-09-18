import clsx from "clsx";
import NextImage, { type ImageProps as NextImageProps } from "next/image";

import { ConditionalWrapper } from "./conditional-wrapper";
import { ExpandIcon } from "./icons/expand-icon";
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
      <div className={clsx("mx-auto relative", className)}>
        {children}
        <Link
          className="border border-2 border-current bg-black absolute bottom-[10px] right-[10px] size-10 p-1 max-w-[30%] max-h-[30%]"
          href={src as string}
          openInNewTab
        >
          <ExpandIcon className="size-auto" />
        </Link>
      </div>
    )}
  >
    <NextImage
      alt={alt}
      className={clsx("mx-auto", className)}
      sizes="(max-width: 650px) 100vw, 650px"
      src={src}
      {...props}
    />
  </ConditionalWrapper>
);
