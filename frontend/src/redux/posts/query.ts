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
    _id,
    title,
    publishedAt,
    slug,
    "imageUrl": media.image.asset->url,
    "videoUrl": media.video.asset->url,
    "videoLink": media.videoLink
  }
`;

export const getPostBySlug = `
    *[_type == "post" && slug.current == $slug][0] {
    ...,
    "imageUrl": media.image.asset->url,
    "videoUrl": media.video.asset->url,
    "videoLink": media.videoLink
  }
`;
