import React from 'react';
import { useSelector } from 'react-redux';

import { postsSelector } from '../redux/posts/selectors';
import { IPostItem } from '../redux/posts/types';
import { BlogItem } from '../components';

export const BlogBlock: React.FC = () => {
  const { items } = useSelector(postsSelector);

  return (
    <div className="blog-about__items">
      {(items as IPostItem[]).map((obj, i) => (
        <BlogItem
          id={obj.id}
          key={i}
          image={`assets/img/blog/${obj.imageUrl}`}
          date={obj.date}
          title={obj.title}
        />
      ))}
    </div>
  )
};