export const getYouTubeThumbnail = (videoUrl?: string) => {
  if (!videoUrl) return "";
  console.log({ videoUrl });

  const youtubeRegex =
    /(?:https?:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+))/;

  const match = RegExp(youtubeRegex).exec(videoUrl);
  if (match) {
    const videoId = match[1] || match[2];
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
  }
  return "";
};
