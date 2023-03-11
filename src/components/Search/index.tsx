import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { IProductItem } from '../../redux/products/types';
import { useDebounce } from '../../hook/debounce';
import { useInput } from '../../hook/input';
import { useGlobalContext } from '../../hook/useGlobalContext';
import { bodyLock, bodyUnlock, ibg, euroToHrivna } from '../../utils';

import styles from './Search.module.scss';

export const Search: React.FC = () => {
  const navigate = useNavigate();

  const { value, onChange, setValue } = useInput('');
  const [dropdown, setDropdown] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [isVisible, setIsVisible] = React.useState(false);
  const { windowWidth, isWebpImg } = useGlobalContext();
  const debounced = useDebounce(value, 250);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const searchProduct = React.useCallback(async () => {
    const { data } = await axios.get(`https://636e34f8b567eed48ad655d0.mockapi.io/products`, {
      params: { title: debounced },
    });
    setItems(data);
  }, [debounced]);

  const onClickSearchItem = (item: IProductItem) => {
    navigate(`/products/${item.category}/${item.id}`);
    setIsVisible(false);
    setValue('');
  };
  
  const onClickClose = React.useCallback(() => {
    if (!value) {
      return setIsVisible(false);
    }
    setValue('');
    inputRef.current?.focus();
    setItems([]);
  }, [setValue, value]);

  const onClickEsc = React.useCallback((event: KeyboardEvent) => {
    event.key === 'Esc' && onClickClose();
  }, [onClickClose]);

  const onClickVisible = () => {
    setIsVisible(true);
    inputRef.current?.focus();
  };

  React.useEffect(() => {
    document.addEventListener('keydown', onClickEsc);
    ibg();

    return () => document.removeEventListener('keydown', onClickEsc);
  });

  React.useEffect(() => {
    document.addEventListener('keydown', onClickEsc);
    return () => document.removeEventListener('keydown', onClickEsc);
  }, [onClickEsc]);

  React.useEffect(() => {
    if (typeof (debounced) === 'string' && debounced.length > 1) {
      setDropdown(true);
      searchProduct();
    } else setDropdown(false);
  }, [debounced, value, dropdown, searchProduct]);

  React.useEffect(() => {
    isVisible === true ? bodyLock() : bodyUnlock();
  }, [isVisible]);

  return (
    <div
      className={isVisible ? `${styles.header__search} ${styles._visible}` : styles.header__search}>
      <div className={styles.header__wrapper}>
        <div className={`_icon-search ${styles.search__label}`} onClick={onClickVisible}></div>
        <input
          id="inputMain"
          ref={inputRef}
          className={styles.search__input}
          type="search"
          placeholder="Пошук товарів"
          onChange={onChange}
          value={value}
        />
        {windowWidth < 683 && isVisible ? (
          <div className={`${styles.close} _icon-close`} onClick={onClickClose}></div>
        ) : (
          value && <div className={`${styles.close} _icon-close`} onClick={onClickClose}></div>
        )}
      </div>
      {dropdown && (
        <div className={styles.search__overlay}>
          <div className={styles.search__dropdown}>
            <ul>
              {items.map((item: IProductItem) => (
                <li key={item.id} onClick={() => onClickSearchItem(item)}>
                  <div className={`${styles.dropdown__img} ibg`}>
                    <img
                      src={`/assets/img/products/${item.imageUrl}${isWebpImg ? '.webp' : '.png'}`}
                      alt={item.title}
                    />
                  </div>
                  <div className={styles.dropdown__content}>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.price}>{euroToHrivna(item.price).toLocaleString()} ₴</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};