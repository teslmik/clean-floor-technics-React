import axios from 'axios';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';

import Breadcrumbs from '../components/Breadcrumbs';
import LeftMenu from '../components/LeftMenu';
import { ibg } from '../js/modules/functions';

const FullBlogItem = () => {
  const { id } = useParams();
  const [blogItem, setBlogItem] = React.useState();

  React.useEffect(() => ibg(), [blogItem]);

  React.useEffect(() => {
    async function fetchPost() {
      try {
        const { data } = await axios.get(`https://636e34f8b567eed48ad655d0.mockapi.io/posts/${id}`);
        setBlogItem(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchPost();
  }, []);

  if (!blogItem) {
    return (
      <div className="__container">
        <div className="blog__wrapper">
          <LeftMenu active={true} id={id} />
          <div className="blog__boby">
            <Breadcrumbs titleBlock={'Блог'} endItem={'...'} />
            <div className="blog__content content-blog">
              <div className="content-blog__title">
                <div className="loader">Loading...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="blog__container">
      <div className="blog__wrapper">
        <LeftMenu active={true} id={id} />
        <div className="blog__boby">
          <Breadcrumbs titleBlock={'Блог'} endItem={blogItem.title} />
          <div className="blog__content content-blog">
            <div className="content-blog__title">{blogItem.title}</div>
            <div className="blog-item__date date-item">{blogItem.date}</div>
            <div className="blog-item__wrapper">
              <div className="blog-item__img blog-img ibg">
                <img src={`/assets/img/blog/${blogItem.imageUrl}`} alt="" />
              </div>
              <div className="blog-text">
                {blogItem.text.map((str, i) => (
                  <ReactMarkdown key={i} children={str} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullBlogItem;
