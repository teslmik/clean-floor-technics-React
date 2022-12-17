import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import { filterSelector, setSort } from '../../redux/slices/filterSlice';
import { bodyLock, bodyUnlock } from '../../js/modules/functions';

import styles from './Sort.module.scss';

const sortList = [
  { name: 'по популярності', sortProperty: 'rating' },
  { name: 'спочатку дешевщі', sortProperty: 'price' },
  { name: 'по назві', sortProperty: 'title' },
];

const Sort = () => {
  const dispatch = useDispatch();
  const { sortState } = useSelector(filterSelector);

  return (
    <div className={styles.sort}>
      <p>Сортування:</p>
      <ul className={styles.sort__btn}>
        {sortList.map((obj, i) => (
          <li
            onClick={() => dispatch(setSort(obj))}
            className={sortState.sortProperty === obj.sortProperty ? styles.active : ''}
            key={i}>
            {obj.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const SortMobile = () => {
  const dispatch = useDispatch();
  const { sortState } = useSelector(filterSelector);
  const [isVisible, setIsVisible] = React.useState(false);
  const [brouserHeight, setBrouserHeight] = React.useState();
  console.log('brouserHeight: ', brouserHeight);

  const onClickSort = (obj) => {
    dispatch(setSort(obj));
    setIsVisible(false);
  };

  React.useEffect(() => {
    setIsVisible(false);
  }, []);

  React.useEffect(() => {
    setBrouserHeight(document.documentElement.clientHeight);
    isVisible === true
      ? (document.body.style.overflowY = 'hidden' && bodyLock())
      : (document.body.style.overflowY = 'visible' && bodyUnlock());
  }, [isVisible, brouserHeight]);

  return (
    <>
      <div className={styles.sort__title} onClick={() => setIsVisible(true)}>
        <p>{sortState.name}</p>
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, height: brouserHeight }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.wrapper}
            onClick={() => setIsVisible(false)}>
            <motion.div
              initial={{ transform: 'translateY({320px})' }}
              animate={{ transform: 'translateY(0px)' }}
              exit={{ transform: 'translateY(320px)' }}
              transition={{ duration: 0.3 }}
              className={styles.sort}
              onClick={(e) => e.stopPropagation()}>
              <p>Сортування</p>
              <ul className={styles.sort__btn}>
                {sortList.map((obj, i) => (
                  <li
                    onClick={() => onClickSort(obj)}
                    className={sortState.sortProperty === obj.sortProperty ? styles.active : ''}
                    key={i}>
                    {obj.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sort;
