import React from 'react';
import { useSelector } from 'react-redux';

import { postsSelector } from '../redux/posts/selectors';
import { IPostItem } from '../redux/posts/types';
import { BlogItem } from '../components';
import { useGlobalContext } from '../hook/useGlobalContext';

export const BlogBlock: React.FC = () => {
  const { items } = useSelector(postsSelector);
  const { isWebpImg } = useGlobalContext();

  return (
    <div className="blog-about__items-wrapper">
      <div className="blog-about__items">
        {(items as IPostItem[]).slice(-3).map((obj, i) => (
          <BlogItem
            id={obj.id}
            key={i}
            image={`assets/img/blog/${obj.imageUrl}${isWebpImg ? '.webp' : '.jpg'}`}
            date={obj.date}
            title={obj.title}
          />
        ))}
      </div>
    </div>
  )
};