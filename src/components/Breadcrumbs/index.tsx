import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { setFilter } from '../../redux/filter/slice';
import { categoriesList } from '../../utils';

import styles from './Breadcrumbs.module.scss';

interface IBreadcrumbsProps {
  title?: string;
  titleBlock?: string;
  category?: string;
  endItem?: string;
}

export const Breadcrumbs: React.FC<IBreadcrumbsProps> = ({ title, titleBlock, category, endItem }) => {
  const dispatch = useDispatch();

  return (
    <nav className={styles.breadcrumbs}>
      <ul>
        <li>
          <Link to={'/'} className={styles.breadcrumbs__link}>
            Головна
          </Link>
        </li>
        {title && category && (
          <li onClick={() => dispatch(setFilter([category]))}>
            <Link to={'/catalog'} className={styles.breadcrumbs__link}>
              {categoriesList.map((cat) => cat.name === category && cat.value)}
            </Link>
          </li>
        )}
        <li>
          {endItem && titleBlock === 'Блог' ? (
            <Link to={'/blog'} className={styles.breadcrumbs__link}>
              <span>{titleBlock}</span>
            </Link>
          ) : (
            <span className={styles.breadcrumbs__link}>{title ? title : titleBlock}</span>
          )}
        </li>
        {endItem && (
          <li>
            <span className={styles.breadcrumbs__link}>{endItem}</span>
          </li>
        )}
      </ul>
    </nav>
  );
};