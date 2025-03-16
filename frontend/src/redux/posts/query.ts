const transformMediaUrl = `
  "imageUrl": media.image.asset->url,
  "videoUrl": media.video.asset->url,
  "videoLink": media.videoLink
`;

export const getAllPosts = `
  *[_type == "post"] | order(publishedAt desc) {
    ...,
    ${transformMediaUrl}
  }
`;

export const getNewPosts = `
  *[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    publishedAt,
    slug,
    ${transformMediaUrl}
  }
`;

export const getPostBySlug = `
    *[_type == "post" && slug.current == $slug][0] {
    ...,
    ${transformMediaUrl}
  }
`;
