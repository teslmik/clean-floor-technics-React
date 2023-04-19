import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { Breadcrumbs, LeftMenu, SkeletonBlog, ErrorInfo } from '../components';
import { useAppDispatch } from '../redux/store';
import { fetchPosts } from '../redux/posts/asyncActions';
import { postsSelector } from '../redux/posts/selectors';
import { IPostItem } from '../redux/posts/types';
import { Status } from '../redux/products/types';
import { ibg } from '../utils';
import Head from '../layouts/Head';
import { useGlobalContext } from '../hook/useGlobalContext';

const Blog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(postsSelector);
  const { pathname } = useLocation();
  const { isWebpImg } = useGlobalContext();

  const skeleton = [...new Array(4)].map((_, i) => (
    <div className="skeleton__wrapper" key={i}>
      <SkeletonBlog />
    </div>
  ));

  React.useEffect(() => {
    window.scroll(0, 0);
    dispatch(fetchPosts());
  }, [dispatch]);

  React.useEffect(() => {
    ibg();
  }, [items]);

  return (
    <section className="blog__container">
      <Head title={'Блог'} url={pathname} />
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
                  : [...items as IPostItem[]].reverse().map((obj, i) => (
                    <li key={i} className="content-blog__item">
                      <Link to={`/blog/${obj.id}`} className="blog-item__img ibg">
                        <img src={`/assets/img/blog/${obj.imageUrl}${isWebpImg ? '.webp' : '.jpg'}`} alt="blogImage" />
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
