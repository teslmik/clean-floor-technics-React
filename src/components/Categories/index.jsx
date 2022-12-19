import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import { categoriesList } from '../../js/modules/functions';
import { AppContext } from '../../App';

import styles from './Categories.module.scss';

const Categories = () => {
  const { handleTooggle } = React.useContext(AppContext);

  const swiperParams = {
    modules: [Navigation],
    navigation: true,
    slidesPerView: 'auto',
    watchOverflow: true,
    spaceBetween: 30,
    freeMode: true,
  };

  return (
    <section className="categories_block__container">
      <h1 className={styles.categories_block__title}>
        <Link to={'catalog'}>Всі категорії товарів</Link>
      </h1>
      <Swiper className={styles.categories_block__items} {...swiperParams}>
        {categoriesList.map((obj, i) => (
          <SwiperSlide
            onClick={() => handleTooggle(obj.name)}
            width={'auto'}
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

export default Categories;
