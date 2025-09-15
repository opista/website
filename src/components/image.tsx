import clsx from "clsx";
import NextImage, { type ImageProps as NextImageProps } from "next/image";

export const Image = ({ alt, className, src, ...props }: NextImageProps) => (
  <NextImage
    alt={alt}
    className={clsx("mx-auto", className)}
    sizes="(max-width: 650px) 100vw, 650px"
    src={src}
    {...props}
  />
);
