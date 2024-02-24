import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import { filterSelector } from '../../redux/filter/selectors';
import { setSort } from '../../redux/filter/slice';
import { SortPropertyEnum } from '../../redux/filter/types';
import { mobileHeight, bodyLock, bodyUnlock } from '../../utils';

import styles from './Sort.module.scss';

interface ISortList {
  name: string;
  sortProperty: SortPropertyEnum;
}

const sortList: ISortList[] = [
  { name: 'по популярності', sortProperty: SortPropertyEnum.RATING },
  { name: 'спочатку дешевщі', sortProperty: SortPropertyEnum.PRICE },
  { name: 'по назві', sortProperty: SortPropertyEnum.TITLE },
];

export const Sort: React.FC = () => {
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

  const onClickSort = (obj: ISortList) => {
    dispatch(setSort(obj));
    setIsVisible(false);
  };

  React.useEffect(() => {
    mobileHeight();
    setIsVisible(false);
    window.addEventListener('resize', mobileHeight);
    return () => {
      window.removeEventListener('resize', mobileHeight);
    };
  }, []);

  React.useEffect(() => {
    mobileHeight();

    const bodyStyle: CSSStyleDeclaration = document.body.style;

    if (bodyStyle) {
      isVisible === true ? bodyLock() : bodyUnlock();
    }
  }, [isVisible]);

  return (
    <>
      <div className={styles.sort__title} onClick={() => setIsVisible(true)}>
        <i className="_icon-sort"></i><p>{sortState.name}</p>
        
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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