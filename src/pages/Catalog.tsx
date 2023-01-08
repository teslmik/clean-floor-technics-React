import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Breadcrumbs, CardItem, ErrorInfo, SkeletonLoader, Filter, Sort, SortMobile } from '../components';
import { filterSelector } from '../redux/filter/selectors';
import { fetchProducts } from '../redux/products/asyncActions';
import { productsSelector } from '../redux/products/selectors';
import { Status } from '../redux/products/types';
import { useAppDispatch } from '../redux/store';
import { useGlobalContext } from '../hook/useGlobalContext';
import Head from '../layouts/Head';

const Catalog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filterState, sortState } = useSelector(filterSelector);
  const { items, status } = useSelector(productsSelector);
  const { windowWidth } = useGlobalContext();
  const { pathname } = useLocation();

  const skeleton = [...new Array(6)].map((_, i) => (
    <div className="skeleton__wrapper" key={i}>
      <SkeletonLoader />
    </div>
  ));

  const products = items.map((obj, i) => <CardItem key={i} {...obj} />);

  React.useEffect(() => {
    window.scroll(0, 0);
    dispatch(fetchProducts());
  }, [sortState]);

  return (
    <>
      <Head title={'Каталог'} url={pathname} />
      <section className="catalog__container">
        <Breadcrumbs titleBlock={'Каталог'} />
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
                : filterState.length === 0
                  ? products
                  : filterState.map((filterValue) =>
                    items
                      .filter((elem: any) => elem.category === filterValue || elem.label[filterValue])
                      .map((obj, i) => <CardItem key={i} {...obj} />),
                  )}
            </div>
          )}
        </div>
      </section>
      {/* <section className="recent-products">
        <div className="recent-products__container">
          <div className="recent-products__head">
            <h2>Переглянуті товари</h2>
          </div>
          <div className="recent-products__body"></div>
        </div>
      </section> */}
    </>
  );
};

export default Catalog;
