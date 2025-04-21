export const getInstagramPostId = (url: string): string | null => {
  const match = url.match(/instagram\.com\/(?:p|reel|tv)\/([^/?]+)/);
  return match ? match[1] : null;
};
