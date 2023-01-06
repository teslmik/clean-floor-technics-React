import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Breadcrumbs from '../components/Breadcrumbs';
import CardItem from '../components/CardItem';
import ErrorInfo from '../components/ErrorInfo';
import SkeletonLoader from '../components/CardItem/SkeletonLoader';
import Filter from '../components/Filter';
import Sort, { SortMobile } from '../components/Sort';
import { filterSelector } from '../redux/slices/filterSlice';
import { fetchProducts, productsSelector, Status } from '../redux/slices/productsSlice';
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
