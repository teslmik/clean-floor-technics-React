import React from 'react';
import { useSelector } from 'react-redux';

import { postsSelector } from '../redux/posts/selectors';
import { IPostItem } from '../redux/posts/types';
import { BlogItem } from '../components';
import { useGlobalContext } from '../hook/useGlobalContext';
import { formatDate } from '../utils';

export const BlogBlock: React.FC = () => {
  const { items } = useSelector(postsSelector);
  const { isWebpImg } = useGlobalContext();

  return (
    <div className="blog-about__items-wrapper">
      <div className="blog-about__items">
        {(items as IPostItem[]).slice(0, 3).map((obj, i) => (
          <BlogItem
            id={obj._id}
            key={i}
            image={`assets/img/blog/${obj.imageUrl}${isWebpImg ? '.webp' : '.jpg'}`}
            date={formatDate(obj.createdAt)}
            title={obj.title}
          />
        )).reverse()}
      </div>
    </div>
  )
};