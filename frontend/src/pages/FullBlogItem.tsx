import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import { Breadcrumbs, ErrorInfo, LeftMenu } from "../components";
import SanityTextRenderer from "../components/SanityTextRenderer";
import { useGlobalContext } from "../hook/useGlobalContext";
import Head from "../layouts/Head";
import { fetchPosts } from "../redux/posts/asyncActions";
import { postsSelector } from "../redux/posts/selectors";
import { IPostItem } from "../redux/posts/types";
import { Status } from "../redux/products/types";
import { useAppDispatch } from "../redux/store";
import { formatDate, ibg } from "../utils";

const FullBlogItem: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(postsSelector);
  const [item, setItem] = React.useState<IPostItem>();
  const { windowWidth } = useGlobalContext();
  const { slug } = useParams();
  const { pathname } = useLocation();

  React.useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  React.useEffect(() => {
    items.length > 0 &&
      items.map((obj) => obj.slug?.current === slug && setItem(obj));
    ibg();
  }, [items, slug]);

  return (
    <section className="blog__container">
      {item && (
        <Head
          title={`Блог - ${item.title}`}
          imageUrl={`blog/${item.imageUrl}`}
          url={pathname}
        />
      )}
      {windowWidth < 882 && (
        <Breadcrumbs titleBlock={"Блог"} endItem={item ? item.title : "..."} />
      )}
      <div className="blog__wrapper">
        <LeftMenu id={slug} />
        <div className="blog__boby">
          {windowWidth > 881 && (
            <Breadcrumbs
              titleBlock={"Блог"}
              endItem={item ? item.title : "..."}
            />
          )}
          <div className="blog__content content-blog">
            {status === Status.ERROR ? (
              <ErrorInfo />
            ) : status === Status.LOADING ? (
              <div className="content-blog__title">
                <div className="loader">Loading...</div>
              </div>
            ) : (
              item && (
                <>
                  <div className="content-blog__title">{item.title}</div>
                  <div className="blog-item__date date-item">
                    {formatDate(item.publishedAt)}
                  </div>
                  <div className="blog-item__wrapper">
                    {(item.imageUrl || item.videoLink || item.videoUrl) && (
                      <div className="blog-item__img blog-img ibg">
                        {item.imageUrl && (
                          <img src={item.imageUrl} alt="blog_image" />
                        )}
                        {item.videoUrl && (
                          <video controls>
                            <track kind="captions" />
                            <source src={item.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        )}
                        {item.videoLink && (
                          <iframe
                            width="100%"
                            height="100%"
                            src={item.videoLink}
                            title="Embedded Video"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        )}
                      </div>
                    )}
                    <div className="blog-text">
                      <SanityTextRenderer content={item.body} />
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullBlogItem;
