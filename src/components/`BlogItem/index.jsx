import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ibg } from '../../js/modules/functions';

const BlogItem = ({ image, date, content, id }) => {
  const navigate = useNavigate();
  const onClickBlogItem = () => {
    navigate(`/blog/${id}`);
    window.location(0, 0);
  };

  React.useEffect(() => {
    ibg();
  }, []);

  return (
    <div onClick={onClickBlogItem} className="blog-about__item blog-item">
      <div className="blog-item__img ibg">
        <img src={image} alt="blog" />
      </div>
      <div className="blog-item__content">
        <div className="blog-item__date">{date}</div>
        <div className="blog-item__text">{content}</div>
      </div>
    </div>
  );
};

export default BlogItem;
