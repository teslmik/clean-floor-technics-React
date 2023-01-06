import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Breadcrumbs from '../components/Breadcrumbs';
import LeftMenu from '../components/LeftMenu';
import SkeletonBlog from '../components/BlogItem/SkeletonBlog';
import ErrorInfo from '../components/ErrorInfo';
import { fetchPosts, postsSelector } from '../redux/slices/postsSlice';
import { useAppDispatch } from '../redux/store';
import { ibg } from '../utils/ibg';
import { Status } from '../redux/slices/productsSlice';
import Head from '../layouts/Head';

const Blog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(postsSelector);

  const skeleton = [...new Array(4)].map((_, i) => (
    <div className="skeleton__wrapper" key={i}>
      <SkeletonBlog />
    </div>
  ));

  React.useEffect(() => {
    window.scroll(0, 0);
    dispatch(fetchPosts({}));
  }, []);

  React.useEffect(() => {
    ibg();
  }, [items]);

  return (
    <section className="blog__container">
      <Head title={'Блог'} />
      <div className="blog__wrapper">
        <LeftMenu />
        <div className="blog__boby">
          <Breadcrumbs titleBlock={'Блог'} />
          <div className="blog__content content-blog">
            <div className="content-blog__title">Блог</div>
            {status === Status.ERROR ? (
              <ErrorInfo />
            ) : (
              <ul className="content-blog__list">
                {status === Status.LOADING
                  ? skeleton
                  : [...items].reverse().map((obj, i) => (
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
