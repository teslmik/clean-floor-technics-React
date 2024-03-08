import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import { setFilter } from "../../redux/filter/slice";
import { filterSelector } from "../../redux/filter/selectors";
import { fetchProducts } from "../../redux/products/asyncActions";
import { productsSelector } from "../../redux/products/selectors";
import { useGlobalContext } from "../../hook/useGlobalContext";
import { useAppDispatch } from "../../redux/store";
import {
  mobileHeight,
  bodyLock,
  bodyUnlock,
  categoriesList,
  filterList,
  toggleFilter,
} from "../../utils";

import styles from "./Filter.module.scss";

export const Filter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(productsSelector);
  const { filterState } = useSelector(filterSelector);
  const { windowWidth } = useGlobalContext();
  const [isVisible, setIsVisible] = React.useState(false);

  const promoCount = (value: string) => {
    let count = 0;
    items.map((obj: any) =>
      obj.label[value] || obj.category === value || obj.availability === true
        ? (count = count + 1)
        : count
    );
    return count;
  };

  const onClickIsVisible = () => {
    if (windowWidth < 882) {
      setIsVisible(false);
    }
  };

  const handleToggle = (value: string) => {
    const filter = toggleFilter(value, filterState);
    dispatch(setFilter(filter));
    dispatch(fetchProducts());
  };

  React.useEffect(() => {
    isVisible === true && windowWidth < 882 ? bodyLock() : bodyUnlock();
  }, [isVisible, windowWidth]);

  React.useEffect(() => {
    if (windowWidth > 881) {
      setIsVisible(true);
      bodyUnlock();
    } else setIsVisible(false);
  }, [windowWidth]);

  React.useEffect(() => {
    mobileHeight();
    window.addEventListener("resize", mobileHeight);
    return () => {
      window.removeEventListener("resize", mobileHeight);
    };
  }, []);

  return (
    <>
      <div
        className={styles.filter__title}
        onClick={() => setIsVisible(!isVisible)}
      >
        Фільтр<i className="_icon-filter"></i>
      </div>
      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.fieldset
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.filter}
            onClick={onClickIsVisible}
          >
            <motion.div
              initial={{ transform: "translateX({-320px})" }}
              animate={{ transform: "translateX(0px)" }}
              exit={{ transform: "translateX(-320px)" }}
              transition={{ duration: 0.2 }}
              className={styles.filter__wrapper}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={styles.filter__header}
                onClick={() => setIsVisible(!isVisible)}
              >
                <span className="_icon-arrow"></span>
                <p>Фільтр</p>
              </div>
              {filterState.length > 0 && (
                <div className={styles.filter__item}>
                  <span
                    onClick={() => dispatch(setFilter([]))}
                    className={styles.filter__clear}
                  >
                    Очистити фільтр
                  </span>
                </div>
              )}
              <ul className={`${styles.filter__item} ${styles.promo_filter}`}>
                {filterList.map((obj, i) => (
                  <li key={i}>
                    <input
                      id={obj.name}
                      type="checkbox"
                      name={obj.name}
                      onChange={() => handleToggle(obj.name)}
                      checked={filterState.indexOf(obj.name) !== -1}
                      disabled={status === "loading"}
                    />
                    <label htmlFor={obj.name}>
                      {obj.value}
                      {promoCount(obj.name) !== 0 && (
                        <sup>{promoCount(obj.name)}</sup>
                      )}
                    </label>
                  </li>
                ))}
              </ul>
              <ul
                className={`${styles.filter__item} ${styles.category_filter}`}
              >
                <h3>Категорії</h3>
                {categoriesList.map((obj, i) => (
                  <li key={i}>
                    <input
                      id={obj.name}
                      type="checkbox"
                      name={obj.name}
                      onChange={() => handleToggle(obj.name)}
                      checked={filterState.indexOf(obj.name) !== -1}
                      disabled={
                        promoCount(obj.name) === 0
                          ? true
                          : status === "loading"
                          ? true
                          : false
                      }
                    />
                    <label htmlFor={obj.name}>
                      {obj.value}
                      {promoCount(obj.name) !== 0 && (
                        <sup>{promoCount(obj.name)}</sup>
                      )}
                    </label>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setIsVisible(!isVisible)}
                className={styles.filter__btn}
              >
                <span>Фільтрувати</span>
              </button>
            </motion.div>
          </motion.fieldset>
        )}
      </AnimatePresence>
    </>
  );
};
