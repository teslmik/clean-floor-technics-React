import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { menuListObj } from '../../js/modules/functions';

import styles from './LeftMenu.module.scss';

const LeftMenu = () => {
  const { pathname } = useLocation();

  return (
    <aside className={styles.blog__menu}>
      <ul className={styles.blog__list}>
        {Object.keys(menuListObj).map((link, i) => (
          <li
            key={i}
            className={
              pathname === '/' + link ? `${styles.blog__item} ${styles.active}` : styles.blog__item
            }>
            <Link to={'/' + link} className={styles.blog__link}>
              {menuListObj[link]}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default LeftMenu;
