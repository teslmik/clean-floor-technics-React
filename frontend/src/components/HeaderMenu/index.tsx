import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "@src/hooks/useGlobalContext";
import { bodyLock, bodyUnlock, ibg, menuListArr } from "@src/utils";
import styles from "./HeaderMenu.module.scss";

interface IHeaderMenuProps {
  windowWidth: number;
  isVisible?: boolean;
  setIsVisible?: (state: boolean) => void;
}

export const HeaderMenu: React.FC<IHeaderMenuProps> = ({
  windowWidth,
  isVisible,
  setIsVisible,
}) => {
  const { setIsOpenCallback, isOpenCallback } = useGlobalContext();

  const menuHandler = () => {
    setIsVisible?.(false);
    setIsOpenCallback(true);
  };

  React.useEffect(() => {
    isVisible === true || isOpenCallback === true ? bodyLock() : bodyUnlock();
    ibg();
  }, [isVisible, isOpenCallback]);

  return (
    <>
      <div onClick={() => setIsVisible?.(true)} className={styles.menu_icon}>
        <span></span>
      </div>
      {windowWidth > 881.98 ? (
        <nav className={styles.menu}>
          <ul className={styles.menu__list}>
            {menuListArr.map((item) => (
              <li key={item.link} className={styles.menu__item}>
                <Link to={item.link} className={styles.menu__link}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : (
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={styles.popup}
              onClick={() => setIsVisible?.(false)}
            >
              <motion.nav
                initial={{ transform: "translateX({-320px})" }}
                animate={{ transform: "translateX(0px)" }}
                exit={{ transform: "translateX(-320px)" }}
                transition={{ duration: 0.2 }}
                className={styles.menu__burger}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  onClick={() => setIsVisible?.(false)}
                  className={styles.menu__title}
                >
                  <span className="_icon-arrow"></span>
                  <p>Назад</p>
                </div>
                <ul className={styles.menu__list}>
                  {menuListArr.map((item) => (
                    <li
                      onClick={() => setIsVisible?.(false)}
                      key={item.link}
                      className={styles.menu__item}
                    >
                      <Link to={item.link} className={styles.menu__link}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className={styles.burger__contacts}>
                  <div className={styles.burger__phones}>
                    <a href="tel:+380970948777">
                      <span className="_icon-phone"></span>
                      097 094-87-77
                    </a>
                  </div>
                  <div className={styles.burger__phones}>
                    <a href="viber://chat?number=%2B380661416662/">
                      <span className="_icon-viber"></span>
                      066 141-66-62
                    </a>
                  </div>
                  <button
                    onClick={menuHandler}
                    className={styles.burger__phones_btn}
                  >
                    <span>Замовити здвінок</span>
                  </button>
                </div>
                <div className={styles.burger__social}>
                  <span>Ми у соцмережах</span>
                  <div className={styles.social__link}>
                    <a
                      href="/"
                      className="social__link"
                      aria-label="Link to facebook page"
                      target="_blanck"
                    >
                      <i className="_icon-fb"></i>
                    </a>
                    <a
                      href="https://www.instagram.com/clean_floor_technics/"
                      target="_blanck"
                      className="social__link"
                      aria-label="Link to instagram page"
                    >
                      <i className="_icon-instagram"></i>
                    </a>
                  </div>
                </div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};
