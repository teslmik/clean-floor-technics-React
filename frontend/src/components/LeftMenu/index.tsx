import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { menuListArr } from '../../utils';

import styles from './LeftMenu.module.scss';

interface ILeftMenuProps {
  id?: string;
}

export const LeftMenu: React.FC<ILeftMenuProps> = ({ id }) => {
  const { pathname } = useLocation();

  return (
    <aside className={styles.blog__menu}>
      <ul className={styles.blog__list}>
        {menuListArr.map((item, i) => (
          <li
            key={i}
            className={
              pathname === '/' + item.link
                ? `${styles.blog__item} ${styles.active}`
                : pathname === `/${item.link}/${id}`
                ? `${styles.blog__item} ${styles.active}`
                : styles.blog__item
            }>
            <Link to={'/' + item.link} className={styles.blog__link}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};