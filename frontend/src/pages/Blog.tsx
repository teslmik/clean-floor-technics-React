import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { Breadcrumbs, ErrorInfo, LeftMenu, SkeletonBlog } from "../components";
import Head from "../layouts/Head";
import { fetchPosts } from "../redux/posts/asyncActions";
import { postsSelector } from "../redux/posts/selectors";
import { Status } from "../redux/products/types";
import { useAppDispatch } from "../redux/store";
import { formatDate, ibg } from "../utils";
import { getYouTubeThumbnail } from "../utils/getYoutubeThumbnail";

const Blog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(postsSelector);
  const { pathname } = useLocation();

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
      <Head title={"Блог"} url={pathname} />
      <div className="blog__wrapper">
        <LeftMenu />
        <div className="blog__boby">
          <Breadcrumbs titleBlock={"Блог"} />
          <div className="blog__content content-blog">
            <div className="content-blog__title">Блог</div>
            {status === Status.ERROR ? (
              <ErrorInfo />
            ) : (
              <ul className="content-blog__list">
                {status === Status.LOADING
                  ? skeleton
                  : items.map((obj) => (
                      <li key={obj._id} className="content-blog__item">
                        <Link
                          to={`/blog/${obj.slug?.current}`}
                          className="blog-item__img ibg"
                        >
                          {(obj.imageUrl || obj.videoLink) && (
                            <img
                              src={
                                obj.imageUrl ||
                                getYouTubeThumbnail(obj.videoLink)
                              }
                              alt="blog_image"
                            />
                          )}
                          {obj.videoUrl && (
                            <video controls>
                              <track kind="captions" />
                              <source src={obj.videoUrl} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </Link>
                        <div className="blog-item__date">
                          {formatDate(obj.publishedAt)}
                        </div>
                        <Link
                          to={`/blog/${obj.slug?.current}`}
                          className="blog-item__text"
                        >
                          {obj.title}
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
