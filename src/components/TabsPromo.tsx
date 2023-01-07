import React from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper';

import CardItem from './CardItem';
import SkeletonLoader from './CardItem/SkeletonLoader';
import ErrorInfo from './ErrorInfo';
import { useAppDispatch } from '../redux/store';
import { fetchProducts } from '../redux/products/asyncActions';
import { productsSelector } from '../redux/products/selectors';
import { Status } from '../redux/products/types';
import { tabsPromo } from '../utils/listConstant';

const TabsPromo: React.FC = () => {
  const { items, status } = useSelector(productsSelector);
  const dispatch = useAppDispatch();
  const [toggleState, setToggleState] = React.useState(0);

  const skeleton = [...new Array(6)].map((_, i) => (
    <SwiperSlide key={i}>
      <div className="skeleton__wrapper"> 
        <SkeletonLoader />
      </div>
    </SwiperSlide>
  ));

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <section className="promo">
      <div className="promo__block">
        <nav className="promo__tabs tabs">
          {tabsPromo.map((obj, i) => (
            <div
              onClick={() => setToggleState(i)}
              className={toggleState === i ? 'tabs__link _active-tabs' : 'tabs__link'}
              key={obj.value}>
              {obj.value}
            </div>
          ))}
        </nav>
        {status === 'error' ? (
          <ErrorInfo />
        ) : (
          <div className="promo__content">
            {tabsPromo.map((tabObj, i) => (
              <Swiper
                key={i}
                className={
                  toggleState === i
                  ? 'catalog promo__catalog __container _active-content'
                  : 'catalog promo__catalog'
                }
                modules={[Navigation, Scrollbar]}
                scrollbar={true}
                slidesPerView='auto'
                watchOverflow={true}
                freeMode={true}
                navigation={true}
                spaceBetween={10}
                slideNextClass='promo-next'
                slidePrevClass='promo-prev'>
              {status === Status.LOADING
                ? skeleton
                : items
                  .filter((obj: any) => {
                    if (obj.label[tabObj.name] || obj[tabObj.name]) return true;
                    return false;
                  })
                  .map((obj, i) => (
                    <SwiperSlide key={i}>
                      <CardItem {...obj} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TabsPromo;
