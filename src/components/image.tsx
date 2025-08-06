import clsx from "clsx";
import NextImage, { type ImageProps as NextImageProps } from "next/image";

export const Image = ({ alt, className, src, ...props }: NextImageProps) => (
  <NextImage
    alt={alt}
    className={clsx("mx-auto", className)}
    src={src}
    {...props}
  />
);
