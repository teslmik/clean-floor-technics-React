import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { ThreeDotsLoader } from "@src/components/ThreeDotsLoader";
import { incrementPage, resetProducts } from "@src/redux/products/slice";
import {
  Breadcrumbs,
  CardItem,
  ErrorInfo,
  Filter,
  SkeletonLoader,
  Sort,
  SortMobile,
} from "../components";
import { useGlobalContext } from "../hook/useGlobalContext";
import Head from "../layouts/Head";
import { filterSelector } from "../redux/filter/selectors";
import { setFilter } from "../redux/filter/slice";
import { fetchSanityProducts } from "../redux/products/asyncActions";
import { productsSelector } from "../redux/products/selectors";
import { Status } from "../redux/products/types";
import { useAppDispatch } from "../redux/store";

const Catalog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sortState } = useSelector(filterSelector);
  const { items, status, page, hasMore } = useSelector(productsSelector);
  const { windowWidth } = useGlobalContext();
  const { pathname } = useLocation();

  const loaderRef = React.useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const skeleton = [...new Array(10)].map((_, i) => (
    <div className="skeleton__wrapper" key={i}>
      <SkeletonLoader />
    </div>
  ));

  React.useEffect(() => {
    window.scroll(0, 0);
    dispatch(fetchSanityProducts({ page: 1 }));

    return () => {
      dispatch(setFilter([]));
      dispatch(resetProducts());
    };
  }, [sortState]);

  React.useEffect(() => {
    if (
      !loaderRef.current ||
      status === Status.LOADING ||
      !hasMore ||
      isLoading
    ) {
      return;
    }

    const element = loaderRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoading(true);
          dispatch(fetchSanityProducts({ page: page + 1 }))
            .then(() => {
              dispatch(incrementPage());
            })
            .finally(() => setIsLoading(false));
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [status, hasMore, page, isLoading]);

  return (
    <>
      <Head title={"Каталог"} url={pathname} />
      <section className="catalog__container">
        <Breadcrumbs titleBlock={"Каталог"} />
        <div className="catalog__top">
          <h2 className="catalog__title title">Каталог</h2>
          {windowWidth > 881 && <Sort />}
        </div>
        {windowWidth < 882 && (
          <div className="catalog__filter-mobile">
            <Filter />
            <SortMobile />
          </div>
        )}
        <div className="catalog__body">
          {windowWidth > 881 && <Filter />}
          {status === Status.ERROR ? (
            <ErrorInfo />
          ) : (
            <div className="catalog__wrapper">
              <div className="catalog__items">
                {status === Status.LOADING && items.products.length === 0
                  ? skeleton
                  : items.products.map((obj) => (
                      <CardItem key={obj._id} {...obj} />
                    ))}
              </div>
              <ThreeDotsLoader loading={isLoading} ref={loaderRef} />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Catalog;
