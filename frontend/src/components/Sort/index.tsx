import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";

import { sortList } from "@src/constants/sort-list";
import { filterSelector } from "@src/redux/filter/selectors";
import { setSort } from "@src/redux/filter/slice";
import { SortTypeState } from "@src/redux/filter/types";
import { fetchSanityProducts } from "@src/redux/products/asyncActions";
import { resetProducts } from "@src/redux/products/slice";
import { useAppDispatch } from "@src/redux/store";
import { bodyLock, bodyUnlock, mobileHeight } from "@src/utils";
import { updateUrlParams } from "@src/utils/urlParams";
import styles from "./Sort.module.scss";

export const Sort: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sortState, filterState } = useSelector(filterSelector);

  const handleSort = (obj: SortTypeState) => {
    dispatch(setSort(obj));
    dispatch(resetProducts());
    dispatch(fetchSanityProducts({ page: 1 }));
    updateUrlParams(filterState, obj);
  };

  return (
    <div className={styles.sort}>
      <p>Сортування:</p>
      <ul className={styles.sort__btn}>
        {sortList.map((obj) => (
          <li
            onClick={() => handleSort(obj)}
            className={
              sortState.sortProperty === obj.sortProperty ? styles.active : ""
            }
            key={obj.name}
          >
            {obj.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const SortMobile = () => {
  const dispatch = useAppDispatch();
  const { sortState, filterState } = useSelector(filterSelector);
  const [isVisible, setIsVisible] = React.useState(false);

  const onClickSort = (obj: SortTypeState) => {
    dispatch(setSort(obj));
    dispatch(resetProducts());
    dispatch(fetchSanityProducts({ page: 1 }));
    setIsVisible(false);
    updateUrlParams(filterState, obj);
  };

  React.useEffect(() => {
    mobileHeight();
    setIsVisible(false);
    window.addEventListener("resize", mobileHeight);
    return () => {
      window.removeEventListener("resize", mobileHeight);
    };
  }, []);

  React.useEffect(() => {
    mobileHeight();

    const bodyStyle: CSSStyleDeclaration = document.body.style;

    if (bodyStyle) {
      if (isVisible) {
        bodyLock();
      } else {
        bodyUnlock();
      }
    }
  }, [isVisible]);

  return (
    <>
      <div
        className={styles.sort__title}
        onClick={() => setIsVisible(true)}
        role="button"
        tabIndex={0}
      >
        <i className="_icon-sort"></i>
        <p>{sortState.name}</p>
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.wrapper}
            onClick={() => setIsVisible(false)}
          >
            <motion.div
              initial={{ transform: "translateY({320px})" }}
              animate={{ transform: "translateY(0px)" }}
              exit={{ transform: "translateY(320px)" }}
              transition={{ duration: 0.3 }}
              className={styles.sort}
              onClick={(e) => e.stopPropagation()}
            >
              <p>Сортування</p>
              <ul className={styles.sort__btn}>
                {sortList.map((obj) => (
                  <li
                    key={obj.name}
                    onClick={() => onClickSort(obj)}
                    className={
                      sortState.sortProperty === obj.sortProperty
                        ? styles.active
                        : ""
                    }
                  >
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
