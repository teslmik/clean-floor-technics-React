import React from 'react';
import { Navigation, EffectFade, Autoplay, Pagination, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { AppContext } from '../App';

import 'swiper/css/bundle';

const SwiperBlock = () => {
  const { isWebpImg } = React.useContext(AppContext);

  const lazyOptions = {
    enabled: true,
    onTransitionStart: false,
    loadPrevNext: true,
  };

  return (
    <Swiper
      tag={'section'}
      modules={[Navigation, Pagination, EffectFade, Autoplay, Lazy]}
      autoplay={{ delay: 4000 }}
      loop={true}
      effect="fade"
      pagination={{ type: 'progressbar' }}
      navigation
      preloadImages={false}
      lazy={lazyOptions}
      watchSlidesProgress={true}>
      {[...new Array(10)].map((_, i) => (
        <SwiperSlide key={i}>
          <div className="swiper__img">
            <img
              data-src={`assets/img/slider/${i + 1}${isWebpImg ? '.webp' : '.jpg'}`}
              src={'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'}
              alt={'Slide-' + (i + 1)}
              className="swiper-lazy"
            />
            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperBlock;
