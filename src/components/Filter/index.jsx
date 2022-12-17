import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import { AppContex } from '../../App';
import { filterSelector, setFilter } from '../../redux/slices/filterSlice';
import { bodyLock, bodyUnlock, categoriesList, filterList } from '../../js/modules/functions';

import styles from './Filter.module.scss';
import { productsSelector } from '../../redux/slices/productsSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector(productsSelector);
  const { filterState } = useSelector(filterSelector);
  const { handleTooggle, windowWidth } = React.useContext(AppContex);
  const [isVisible, setIsVisible] = React.useState(false);

  const promoCount = (value) => {
    let count = 0;
    items.map((obj) => (obj.label[value] || obj.category === value ? (count = count + 1) : count));
    return count;
  };

  React.useEffect(() => {
    isVisible === true && windowWidth < 881.98
      ? (document.body.style.overflowY = 'hidden' && bodyLock())
      : (document.body.style.overflowY = 'visible' && bodyUnlock());
  }, [isVisible, windowWidth]);

  React.useEffect(() => {
    if (windowWidth > 881.98) {
      setIsVisible(true);
      document.body.style.overflowY = 'visible' && bodyUnlock();
    } else setIsVisible(false);
  }, [windowWidth]);

  return (
    <>
      <div className={styles.filter__title} onClick={() => setIsVisible(true)}>
        Фільтр
      </div>
      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.fieldset
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.filter}
            onClick={() => setIsVisible(false)}>
            <motion.div
              initial={{ transform: 'translateX({-320px})' }}
              animate={{ transform: 'translateX(0px)' }}
              exit={{ transform: 'translateX(-320px)' }}
              transition={{ duration: 0.2 }}
              className={styles.filter__wrapper}
              onClick={(e) => e.stopPropagation()}>
              <div className={styles.filter__header} onClick={() => setIsVisible(false)}>
                <span className="_icon-arrow"></span>
                <p>Фільтр</p>
              </div>
              {filterState.length > 0 && (
                <div className={styles.filter__item}>
                  <span onClick={() => dispatch(setFilter([]))} className={styles.filter__clear}>
                    Очистити фільтр
                  </span>
                </div>
              )}
              <ul className={`${styles.filter__item} ${styles.promo_filter}`}>
                {filterList.map((obj, i) => (
                  <li key={i}>
                    <input
                      type="checkbox"
                      name={obj.name}
                      onChange={() => handleTooggle(obj.name)}
                      checked={filterState.indexOf(obj.name) === -1 ? false : true}
                      id={obj.name}
                      disabled={status === 'loading' ? true : false}
                    />
                    <label htmlFor={obj.name}>
                      {obj.value}
                      {promoCount(obj.name) !== 0 && <sup>{promoCount(obj.name)}</sup>}
                    </label>
                  </li>
                ))}
              </ul>
              <ul className={`${styles.filter__item} ${styles.category_filter}`}>
                <h3>Категорії</h3>
                {categoriesList.map((obj, i) => (
                  <li key={i}>
                    <input
                      type="checkbox"
                      name={obj.name}
                      onChange={() => handleTooggle(obj.name)}
                      checked={filterState.indexOf(obj.name) === -1 ? false : true}
                      id={obj.name}
                      disabled={
                        promoCount(obj.name) === 0 ? true : status === 'loading' ? true : false
                      }
                    />
                    <label htmlFor={obj.name}>
                      {obj.value}
                      {promoCount(obj.name) !== 0 && <sup>{promoCount(obj.name)}</sup>}
                    </label>
                  </li>
                ))}
              </ul>
              <button onClick={() => setIsVisible(false)} className={styles.filter__btn}>
                <span>Фільтрувати</span>
              </button>
            </motion.div>
          </motion.fieldset>
        )}
      </AnimatePresence>
    </>
  );
};

export default Filter;
