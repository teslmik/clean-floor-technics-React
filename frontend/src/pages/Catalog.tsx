import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  Breadcrumbs,
  CardItem,
  ErrorInfo,
  SkeletonLoader,
  Filter,
  Sort,
  SortMobile,
} from "../components";
import { filterSelector } from "../redux/filter/selectors";
import { fetchProducts } from "../redux/products/asyncActions";
import { productsSelector } from "../redux/products/selectors";
import { Status } from "../redux/products/types";
import { useAppDispatch } from "../redux/store";
import { useGlobalContext } from "../hook/useGlobalContext";
import Head from "../layouts/Head";
import { setFilter } from "../redux/filter/slice";

const Catalog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sortState } = useSelector(filterSelector);
  const { items, status } = useSelector(productsSelector);
  const { windowWidth } = useGlobalContext();
  const { pathname } = useLocation();

  const skeleton = [...new Array(8)].map((_, i) => (
    <div className="skeleton__wrapper" key={i}>
      <SkeletonLoader />
    </div>
  ));

  React.useEffect(() => {
    window.scroll(0, 0);
    dispatch(fetchProducts());

    return () => {
      dispatch(setFilter([]));
    };
  }, [sortState]);

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
            <div className="catalog__items">
              {status === Status.LOADING
                ? skeleton
                : items.products.map((obj, i) => <CardItem key={i} {...obj} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Catalog;
