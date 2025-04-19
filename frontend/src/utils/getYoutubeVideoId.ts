export const getYoutubeVideoId = (videoUrl: string) => {
  if (!videoUrl) return "";

  const regex =
    /(?:youtube\.com\/(?:embed|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = RegExp(regex).exec(videoUrl);

  return match ? match[1] : null;
};
