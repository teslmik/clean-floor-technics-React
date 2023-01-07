import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Search from './Search';
import HeaderMenu from './HeaderMenu';
import { useGlobalContext } from '../hook/useGlobalContext';
import { cartSelector } from '../redux/cart/selectors';

const Header: React.FC = () => {
  const { items, totalPrice } = useSelector(cartSelector);
  const { setIsOpenCallback, setIsOpenCart, windowWidth, isWebpImg } = useGlobalContext();
  const [isVisible, setIsVisible] = React.useState(false);
  const isMounted = React.useRef(false);
  const { pathname } = useLocation();

  const totalCount = items.reduce((sum: number, item) => sum + item.count, 0);

  const styleLogo = pathname === '/cart' ? { marginRight: '0px', flex: '0 0 auto' } : {};

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__container">
          <div className="header__layout">
            <div className="header__left">
              {windowWidth > 881.98 && <HeaderMenu windowWidth={windowWidth} />}
            </div>
            <div className="header__right">
              <div className="header__social social">
                <span>Ми у соцмережах</span>
                <a
                  href="/"
                  className="social__link"
                  aria-label="Link to facebook page"
                  target="_blanck">
                  <i className="_icon-fb"></i>
                </a>
                <a
                  href="https://www.instagram.com/clean_floor_technics/"
                  target="_blanck"
                  className="social__link"
                  aria-label="Link to instagram page">
                  <i className="_icon-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header__bottom">
        <div className="header__container">
          <div className="header__layout">
            {windowWidth < 881.98 && (
              <HeaderMenu
                windowWidth={windowWidth}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
              />
            )}
            <div className="header__logo ibg" style={styleLogo}>
              <a href="/">
                <img src={`/assets/img/logo/logo-transparent${isWebpImg ? '.webp' : '.png'}`} alt="logo" />
              </a>
            </div>
            {pathname === '/cart' ? (
              <div className="cart-back">
                <Link to={'/catalog'} className="_icon-arrow-left">
                  {windowWidth > 402
                    ? 'Повернутися до покупок'
                    : windowWidth > 355
                    ? 'Назад до покупок'
                    : 'Назад'}
                </Link>
              </div>
            ) : (
              <Search />
            )}
            <div className={`header__actions actions ${pathname === '/cart' && 'hide'}`}>
              <div className="actions__contacts">
                <div className="actions__phones-list phones-list">
                  <div className="phones-list__item">
                    <a className="_icon-phone" href="tel:+380970948777">
                      097 094-87-77
                    </a>
                  </div>
                  <div className="phones-list__item">
                    <a className="_icon-viber" href="viber://chat?number=%2B380661416662/">
                      066 141-66-62
                    </a>
                  </div>
                </div>
                <div onClick={() => setIsOpenCallback(true)} className="actions__phones-text">
                  <span>Передзвонити Вам?</span>
                </div>
              </div>
              {pathname !== '/cart' &&
                (totalCount > 0 ? (
                  <div className="actions__cart cart-header" onClick={() => setIsOpenCart(true)}>
                    <div className="cart-header__icon _icon-cart">
                      <p>{totalCount}</p>
                    </div>
                    <div className="cart-header__text">
                      <div className="cart-header__title">Мій заказ</div>
                      <div className="cart-header__price">{totalPrice.toLocaleString()} ₴</div>
                    </div>
                  </div>
                ) : (
                  <div className="actions__cart" style={{ cursor: 'default' }}>
                    <div className="cart-header__icon _icon-cart">
                      <p>0</p>
                    </div>
                    <div className="cart-header__text">
                      <div className="cart-header__title">Мій заказ</div>
                      <div className="cart-header__price">0 ₴</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
