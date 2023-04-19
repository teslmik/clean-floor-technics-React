import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ibg } from '../../utils';

export interface IBlogItemProps {
  image: string;
  date: string;
  title: string;
  id: string;
}

export const BlogItem: React.FC<IBlogItemProps> = ({ image, date, title, id }) => {
  const navigate = useNavigate();
  const onClickBlogItem = () => {
    navigate(`/blog/${id}`);
    window.scroll(0, 0);
  };
  console.log('image: ', image);

  React.useEffect(() => {
    ibg();
  }, []);

  return (
    <div onClick={onClickBlogItem} className="blog-about__item blog-item">
      <div className="blog-item__img ibg">
        <img src={image} alt="blog_image" />
      </div>
      <div className="blog-item__content">
        <div className="blog-item__date">{date}</div>
        <div className="blog-item__text">{title}</div>
      </div>
    </div>
  );
};