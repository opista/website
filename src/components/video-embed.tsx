export type VideoEmbedProps = {
  className?: string;
  src: string;
  title?: string;
  type?: string;
};

const getFileType = (src: string) => {
  const cleanPath = src.split(/[?#]/)[0];

  if (!cleanPath) {
    throw new Error("Invalid video path");
  }

  const parts = cleanPath?.split("/")?.pop()?.split(".");

  if (!parts?.length) {
    throw new Error("VideoEmbed expects a type prop");
  }

  return parts.pop()?.toLowerCase();
};

export const VideoEmbed = ({
  className,
  src,
  title,
  type = getFileType(src),
}: VideoEmbedProps) => (
  <video className={className} controls preload="metadata" title={title}>
    <source src={src} type={`video/${type}`} />
  </video>
);
