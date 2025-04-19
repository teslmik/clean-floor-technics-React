import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { filterSelector } from "@src/redux/filter/selectors";
import { setFilter } from "@src/redux/filter/slice";
import { useAppDispatch } from "@src/redux/store";
import { categoriesList, toggleFilter } from "@src/utils";
import styles from "./Categories.module.scss";

export const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filterState } = useSelector(filterSelector);

  const handleToggle = (value: string) => {
    const filter = toggleFilter(value, filterState);
    dispatch(setFilter(filter));
  };

  return (
    <section className="categories_block__container">
      <Swiper
        className={styles.categories_block__items}
        modules={[Navigation]}
        navigation={true}
        slidesPerView="auto"
        watchOverflow={true}
        spaceBetween={30}
        freeMode={true}
      >
        {categoriesList.map((obj, i) => (
          <SwiperSlide
            onClick={() => handleToggle(obj.name)}
            key={i}
            className={styles.categories_block__item}
          >
            <Link to={"catalog"}>
              <i className={`_icon-${obj.name}`}></i>
              <p>{obj.value}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
