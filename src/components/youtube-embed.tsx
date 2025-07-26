type YoutubeEmbedProps = {
  videoId: string;
};

export const YoutubeEmbed = ({ videoId }: YoutubeEmbedProps) => {
  return (
    <iframe
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className="aspect-video"
      frameBorder="0"
      referrerPolicy="strict-origin-when-cross-origin"
      src={`https://www.youtube-nocookie.com/embed/${videoId}`}
      title="YouTube video player"
    ></iframe>
  );
};
