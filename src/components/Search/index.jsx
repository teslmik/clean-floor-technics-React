import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';

import { useDebounce } from '../../hook/debounce.ts';
import { useInput } from '../../hook/input.ts';
import { bodyLock, bodyUnlock, ibg, isWebp } from '../../js/modules/functions';

import styles from './Search.module.scss';

const Search = () => {
  const navigate = useNavigate();
  const [input, bindInput, resetInput] = useInput('');
  const [dropdown, setDropdown] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [isVisible, setIsVisible] = React.useState(false);
  const { windowWidth } = React.useContext(AppContext);
  const debounced = useDebounce(input, 250);

  const inputRef = React.useRef();

  const searchProduct = async () => {
    const { data } = await axios.get(`https://636e34f8b567eed48ad655d0.mockapi.io/products`, {
      params: { search: debounced },
    });
    setItems(data);
  };

  const onClickSearchItem = (item) => {
    navigate(`/products/${item.category}/${item.id}`);
    resetInput();
    setIsVisible(false);
  };

  const onClickClose = () => {
    if (!input) {
      return setIsVisible(false);
    }
    resetInput();
    inputRef.current.focus();
  };

  const onClickVisible = () => {
    setIsVisible(true);
    inputRef.current.focus();
  };

  React.useEffect(() => {
    ibg();
    isWebp();
    if (debounced.length > 1) {
      searchProduct().then(() => setDropdown(true));
    } else setDropdown(false);
  }, [debounced, input, dropdown]);

  React.useEffect(() => {
    isVisible === true
      ? (document.body.style.overflowY = 'hidden' && bodyLock())
      : (document.body.style.overflowY = 'visible' && bodyUnlock());
    ibg();
  }, [isVisible]);

  return (
    <div
      className={isVisible ? `${styles.header__search} ${styles._visible}` : styles.header__search}>
      <div className={styles.header__wrapper}>
        <div className={`_icon-search ${styles.search__label}`} onClick={onClickVisible}></div>
        <input
          id="inputMain"
          ref={inputRef}
          className={
            dropdown
              ? `${styles.search__input} ${styles.borderRadiusBottomNone} `
              : `${styles.search__input}`
          }
          type="search"
          placeholder="Пошук товарів"
          {...bindInput}
        />
        {windowWidth < 683 && isVisible ? (
          <div className={`${styles.close} _icon-close`} onClick={onClickClose}></div>
        ) : (
          input && <div className={`${styles.close} _icon-close`} onClick={onClickClose}></div>
        )}
      </div>
      {dropdown && (
        <div className={styles.search__overlay}>
          <div className={styles.search__dropdown}>
            <ul>
              {items.map((item) => (
                <li key={item.id} onClick={() => onClickSearchItem(item)}>
                  <div className={`${styles.dropdown__img} ibg`}>
                    <img src={`/assets/img/products/${item.imageUrl}`} alt={item.title} />
                  </div>
                  <div className={styles.dropdown__content}>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.price}>{item.price.toLocaleString()} ₴</p>
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

export default Search;
