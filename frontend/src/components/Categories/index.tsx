import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import { useGlobalContext } from '../../hook/useGlobalContext';
import { categoriesList } from '../../utils';

import styles from './Categories.module.scss';

export const Categories: React.FC = () => {
  const { handleTooggle } = useGlobalContext();

  return (
    <section className="categories_block__container">
      {/* <h1 className={styles.categories_block__title}>
        <Link to={'catalog'}>Всі категорії товарів</Link>
      </h1> */}
      <Swiper
        className={styles.categories_block__items}
        modules={[Navigation]}
        navigation={true}
        slidesPerView='auto'
        watchOverflow={true}
        spaceBetween={30}
        freeMode={true}>
        {categoriesList.map((obj, i) => (
          <SwiperSlide
            onClick={() => handleTooggle(obj.name)}
            key={i}
            className={styles.categories_block__item}>
            <Link to={'catalog'}>
              <i className={`_icon-${obj.name}`}></i>
              <p>{obj.value}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};