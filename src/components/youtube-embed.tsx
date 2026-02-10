type YoutubeEmbedProps = {
  start?: number;
  title?: string;
  videoId: string;
};

const buildEmbedUrl = ({ start, videoId }: YoutubeEmbedProps) => {
  const baseUrl = "https://www.youtube-nocookie.com/embed/";
  const startParam = start ? `?start=${start}` : "";

  return [baseUrl, videoId, startParam].filter(Boolean).join("");
};

export const YoutubeEmbed = ({ title = "YouTube video player", ...props }: YoutubeEmbedProps) => (
  <iframe
    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    allowFullScreen
    className="aspect-video w-full"
    frameBorder="0"
    loading="lazy"
    referrerPolicy="strict-origin-when-cross-origin"
    src={buildEmbedUrl(props)}
    title={title}
  ></iframe>
);
