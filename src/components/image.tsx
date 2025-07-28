import clsx from "clsx";
import NextImage from "next/image";

type ImageProps = {
  alt: string;
  className?: string;
  height: number;
  src: string;
  width: number;
};

export const Image = ({ alt, className, height, src, width }: ImageProps) => (
  <NextImage
    alt={alt}
    className={clsx("mx-auto", className)}
    height={height}
    src={src}
    width={width}
  />
);
