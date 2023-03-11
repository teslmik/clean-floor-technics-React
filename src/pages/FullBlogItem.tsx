import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { Breadcrumbs, ErrorInfo, LeftMenu } from '../components';
import { useAppDispatch } from '../redux/store';
import { fetchPosts } from '../redux/posts/asyncActions';
import { postsSelector } from '../redux/posts/selectors';
import { IPostItem } from '../redux/posts/types';
import { Status } from '../redux/products/types';
import { useGlobalContext } from '../hook/useGlobalContext';
import { ibg } from '../utils';
import Head from '../layouts/Head';

const FullBlogItem: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(postsSelector);
  const [item, setItem] = React.useState<IPostItem>();
  const { windowWidth } = useGlobalContext();
  const { id } = useParams();
  const { pathname } = useLocation();

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  React.useEffect(() => {
    items.length > 0 && items.map((obj) => obj.id.toString() === id?.toString() && setItem(obj));
    ibg();
  }, [items, item, id]);

  return (
    <section className="blog__container">
      {item && <Head title={`Блог - ${item.title}`} imageUrl={`blog/${item.imageUrl}`} url={pathname} />}
      {windowWidth < 882 && <Breadcrumbs titleBlock={'Блог'} endItem={item ? item.title : '...'} />}
      <div className="blog__wrapper">
        <LeftMenu id={id} />
        <div className="blog__boby">
          {windowWidth > 881 && <Breadcrumbs titleBlock={'Блог'} endItem={item ? item.title : '...'} />}
          <div className="blog__content content-blog">
            {status === Status.ERROR ? (
              <ErrorInfo />
            ) : status === Status.LOADING ? (
              <div className="content-blog__title">
                <div className="loader">Loading...</div>
              </div>
            ) : item && (
              <>
                <div className="content-blog__title">{item.title}</div>
                <div className="blog-item__date date-item">{item.date}</div>
                <div className="blog-item__wrapper">
                  <div className="blog-item__img blog-img ibg">
                    <img src={`/assets/img/blog/${item.imageUrl}`} alt="" />
                  </div>
                  <div className="blog-text">
                    {item.text.map((str, i) => (
                      <ReactMarkdown key={i} children={str} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullBlogItem;
