export const getAllPosts = `
  *[_type == "post"] | order(publishedAt desc) {
    ...,
    "imageUrl": media.image.asset->url,
    "videoUrl": media.video.asset->url,
    "videoLink": media.videoLink
  }
`;

export const getNewPosts = `
  *[_type == "post"] | order(publishedAt desc)[0...3] {
    title,
    publishedAt,
    "imageUrl": media.image.asset->url,
    "videoUrl": media.video.asset->url,
    "videoLink": media.videoLink
  }
`;
