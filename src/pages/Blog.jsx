import axios from 'axios';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import Breadcrumbs from '../components/Breadcrumbs';
import LeftMenu from '../components/LeftMenu';
import SkeletonBlog from '../components/`BlogItem/SkeletonBlog';
import { ibg } from '../js/modules/functions';

const Blog = () => {
  const [blogItem, setBlogItem] = React.useState([]);

  const skeleton = [...new Array(5)].map((_, i) => (
    <div className="skeleton__wrapper" key={i}>
      <SkeletonBlog />
    </div>
  ));

  React.useEffect(() => {
    window.scroll(0, 0);
    async function fetchPosts() {
      try {
        const { data } = await axios.get('https://636e34f8b567eed48ad655d0.mockapi.io/posts');
        setBlogItem(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchPosts();
  }, []);

  React.useEffect(() => {
    ibg();
  }, [blogItem]);

  return (
    <section className="blog__container">
      <div className="blog__wrapper">
        <LeftMenu />
        <div className="blog__boby">
          <Breadcrumbs titleBlock={'Блог'} />
          <div className="blog__content content-blog">
            <div className="content-blog__title">Блог</div>
            <ul className="content-blog__list">
              {blogItem.length === 0
                ? skeleton
                : blogItem.map((obj, i) => (
                    <li key={i} className="content-blog__item">
                      <Link to={`/blog/${obj.id}`} className="blog-item__img ibg">
                        <img src={`/assets/img/blog/${obj.imageUrl}`} alt="" />
                      </Link>
                      <div className="blog-item__date">{obj.date}</div>
                      <Link to={`/blog/${obj.id}`} className="blog-item__text">
                        {<ReactMarkdown children={obj.title} />}
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
