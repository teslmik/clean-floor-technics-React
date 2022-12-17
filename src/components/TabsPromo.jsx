import React from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper';

import { AppContex } from '../App';
import CardItem from './CardItem';
import ErrorInfo from './ErrorInfo';
import SkeletonLoader from './CardItem/SkeletonLoader';
import { productsSelector } from '../redux/slices/productsSlice';
import { tabsPromo } from '../js/modules/functions';

const TabsPromo = () => {
  const { items, status } = useSelector(productsSelector);
  const { getProducts } = React.useContext(AppContex);
  const [toggleState, setToggleState] = React.useState(0);

  const swiperParams = {
    modules: [Navigation, Scrollbar],
    scrollbar: true,
    slidesPerView: 'auto',
    watchOverflow: true,
    freeMode: true,
    navigation: true,
    spaceBetween: 10,
    slideNextClass: 'promo-next',
    slidePrevClass: 'promo-prev',
  };

  React.useEffect(() => {
    getProducts();
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
                    ? 'catalog promo__catalog  __container  _active-content'
                    : 'catalog promo__catalog'
                }
                navigation={true}
                {...swiperParams}>
                {status === 'loading'
                  ? [...new Array(6)].map((_, i) => (
                      <SwiperSlide width={'auto'} key={i}>
                        <SkeletonLoader />
                      </SwiperSlide>
                    ))
                  : items
                      .filter((obj) => {
                        if (obj.label[tabObj.name] || obj[tabObj.name]) return true;
                        return false;
                      })
                      .map((obj, i) => (
                        <SwiperSlide width={'auto'} key={i}>
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
