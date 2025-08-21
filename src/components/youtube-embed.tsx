type YoutubeEmbedProps = {
  start?: number;
  videoId: string;
};

const buildEmbedUrl = ({ start, videoId }: YoutubeEmbedProps) => {
  const baseUrl = "https://www.youtube-nocookie.com/embed/";
  const startParam = start ? `?start=${start}` : "";

  return [baseUrl, videoId, startParam].filter(Boolean).join("");
};

export const YoutubeEmbed = (props: YoutubeEmbedProps) => (
  <iframe
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    className="aspect-video"
    frameBorder="0"
    referrerPolicy="strict-origin-when-cross-origin"
    src={buildEmbedUrl(props)}
    title="YouTube video player"
  ></iframe>
);
