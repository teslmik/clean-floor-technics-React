export const getYouTubeThumbnail = (videoUrl?: string) => {
  if (!videoUrl) return "";

  const regex =
    /(?:youtube\.com\/(?:embed|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = RegExp(regex).exec(videoUrl);

  if (match?.[1]) {
    const videoId = match[1];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  return "";
};
