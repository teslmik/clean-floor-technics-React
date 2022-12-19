import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppContext } from '../App';
import Breadcrumbs from '../components/Breadcrumbs';
import CardItem from '../components/CardItem';
import ErrorInfo from '../components/ErrorInfo';
import SkeletonLoader from '../components/CardItem/SkeletonLoader';
import Filter from '../components/Filter';
import Sort, { SortMobile } from '../components/Sort';
import { filterSelector, setFilter } from '../redux/slices/filterSlice';
import { productsSelector } from '../redux/slices/productsSlice';

const Catalog = () => {
  const dispatch = useDispatch();
  const { filterState, sortState } = useSelector(filterSelector);
  const { items, status } = useSelector(productsSelector);
  const { getProducts, windowWidth } = React.useContext(AppContext);

  React.useEffect(() => {
    window.scroll(0, 0);
    getProducts();
    return () => dispatch(setFilter([]));
  }, [sortState]);

  const skeleton = [...new Array(6)].map((_, i) => (
    <div className='skeleton__wrapper'>
      <SkeletonLoader key={i} />
    </div>
  ));
  const products = items.map((obj, i) => <CardItem key={i} {...obj} />);

  return (
    <>
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
          {status === 'error' ? (
            <ErrorInfo />
          ) : (
            <div className="catalog__items">
                {status === 'loading' ? skeleton
                  // : skeleton}
              : filterState.length === 0
                ? products
                : filterState.map((filterValue) =>
                    items
                      .filter((elem) => elem.category === filterValue || elem.label[filterValue])
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
