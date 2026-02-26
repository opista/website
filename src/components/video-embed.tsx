export type VideoEmbedProps = {
  className?: string;
  poster?: string;
  src: string;
  title?: string;
  tracks?: {
    default?: boolean;
    kind?: "captions" | "chapters" | "descriptions" | "metadata" | "subtitles";
    label: string;
    src: string;
    srcLang: string;
  }[];
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
  poster,
  src,
  title,
  tracks,
  type = getFileType(src),
}: VideoEmbedProps) => (
  <video className={className} controls poster={poster} preload="metadata" title={title}>
    <source src={src} type={`video/${type}`} />
    {tracks?.map((track) => <track key={track.src} {...track} />)}
  </video>
);
