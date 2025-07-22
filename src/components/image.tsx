import NextImage from "next/image";

type ImageProps = {
  alt: string;
  height: number;
  src: string;
  width: number;
};

export const Image = ({ alt, height, src, width }: ImageProps) => (
  <NextImage
    alt={alt}
    className="mx-auto"
    height={height}
    src={src}
    width={width}
  />
);
