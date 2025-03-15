import React from "react";
import { useNavigate } from "react-router-dom";

import { ibg } from "../../utils";
import { getYouTubeThumbnail } from "../../utils/getYoutubeThumbnail";

export interface IBlogItemProps {
  slug?: string;
  media?: { imageUrl?: string; videoUrl?: string; videoLink?: string };
  date?: string;
  title?: string;
}

export const BlogItem: React.FC<IBlogItemProps> = ({
  slug,
  media,
  date,
  title,
}) => {
  const navigate = useNavigate();
  const onClickBlogItem = () => {
    navigate(`/blog/${slug}`);
    window.scroll(0, 0);
  };

  const isMedia = media?.imageUrl || media?.videoLink || media?.videoUrl;

  React.useEffect(() => {
    ibg();
  }, []);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClickBlogItem}
      className="blog-about__item blog-item"
    >
      {isMedia && (
        <div className="blog-item__img ibg">
          {(media.imageUrl || media.videoLink) && (
            <img
              src={media.imageUrl || getYouTubeThumbnail(media.videoLink)}
              alt="blog_image"
            />
          )}
          {media.videoUrl && (
            <video controls>
              <track kind="captions" />
              <source src={media.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}
      <div className="blog-item__content">
        <div className="blog-item__date">{date}</div>
        <div className="blog-item__text">{title}</div>
      </div>
    </div>
  );
};
