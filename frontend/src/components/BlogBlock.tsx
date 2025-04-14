import React from "react";
import { useSelector } from "react-redux";

import { BlogItem } from "../components";
import { postsSelector } from "../redux/posts/selectors";
import { formatDate } from "../utils";

export const BlogBlock: React.FC = () => {
  const { items } = useSelector(postsSelector);

  return (
    <div className="blog-about__items-wrapper">
      <div className="blog-about__items">
        {items
          .slice(0, 3)
          .map((obj) => (
            <BlogItem
              key={obj._id}
              media={{
                imageUrl: obj.imageUrl,
                videoUrl: obj.videoUrl,
                videoLink: obj.videoLink,
              }}
              date={formatDate(obj.publishedAt)}
              title={obj.title}
              slug={obj.slug?.current}
            />
          ))
          .reverse()}
      </div>
    </div>
  );
};
