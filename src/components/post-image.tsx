import { HTMLProps } from "react";
import Image from "next/image";

type PostImageProps = {
  alt: string;
  large?: boolean;
  src: string;
};

export default function PostImage({ alt, large, src }: PostImageProps) {
  return (
    <Image
      alt={alt}
      className="mx-auto"
      height={large ? 837 : 280}
      src={src}
      width={large ? 1200 : 440}
    />
  );
}
