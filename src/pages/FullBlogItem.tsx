import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Breadcrumbs from '../components/Breadcrumbs';
import ErrorInfo from '../components/ErrorInfo';
import LeftMenu from '../components/LeftMenu';
import { ibg } from '../utils/ibg.js';
import { fetchPosts, postsSelector } from '../redux/slices/postsSlice';
import { Status } from '../redux/slices/productsSlice';
import { useAppDispatch } from '../redux/store';

const FullBlogItem: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(postsSelector);
  const { id } = useParams();
  console.log('id: ', id);
  console.log('items: ', items);

  React.useEffect(() => {
    const _id = String(id);
    dispatch(fetchPosts({_id}));
  }, []);

  React.useEffect(() => {
    ibg();
  }, [items]);

  return (
    <section className="blog__container">
      <div className="blog__wrapper">
        <LeftMenu id={id} />
        <div className="blog__boby">

          <Breadcrumbs titleBlock={'Блог'} endItem={status === Status.SUCCESS ? items[0].title : '...'} />

          <div className="blog__content content-blog">
            {status === Status.ERROR ? (
              <ErrorInfo />
            ) : status === Status.LOADING ? (
              <div className="content-blog__title">
                <div className="loader">Loading...</div>
              </div>
            ) : status === Status.SUCCESS && (
              <>
                <div className="content-blog__title">{items[0].title}</div>
                <div className="blog-item__date date-item">{items[0].date}</div>
                <div className="blog-item__wrapper">
                  <div className="blog-item__img blog-img ibg">
                    <img src={`/assets/img/blog/${items[0].imageUrl}`} alt="" />
                  </div>
                  <div className="blog-text">
                    {items[0].text.map((str, i) => (
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
