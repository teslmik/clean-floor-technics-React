import React from 'react';
import { Link } from 'react-router-dom';

import { AppContex } from '../App';
import { categoriesList, menuListObj } from '../js/modules/functions';

const Footer = () => {
  const { setIsOpenCallback, handleTooggle, scroll } = React.useContext(AppContex);

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__layout">
          <div className="footer__copyright copyright">
            <a href="/" className="copyright__logo ibg">
              <img src="/assets/img/logo/logo-transparent.png" alt="logo" />
            </a>
            <div className="copyright__text">
              <p>© Інтернет-магазин Clean Floor Technics</p>
              <p>2021-2022</p>
              <p>
                Created by <a href="https://github.com/teslmik">Mikhaylo&nbsp;Teslenko</a>
              </p>
            </div>
          </div>
          <div className="footer__catalog">
            <div className="title-footer">Каталог</div>
            <div className="footer__list">
              {categoriesList.map((obj, i) => (
                <Link
                  key={i}
                  onClick={() => handleTooggle(obj.name)}
                  to={'catalog'}
                  className="footer__link">
                  <span>{obj.value}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="footer__clients">
            <div className="title-footer">Клієнтам</div>
            <div className="footer__list">
              {Object.keys(menuListObj).map((link, i) => (
                <Link key={i} to={link} className="footer__link">
                  {menuListObj[link]}
                </Link>
              ))}
            </div>
          </div>
          <div className="footer__contacts contacts-footer">
            <div className="title-footer">Контактна інформація</div>
            <div className="contacts-footer__block">
              <div className="footer-actions actions__contacts">
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
              <div className="contacts-footer__info">
                <a className="_icon-mail" href="mailto:info@cleanfloor.com.ua">
                  info@cleanfloor.com.ua
                </a>
                <div className="contacts-footer__location _icon-location">
                  <p>Одеса, вул.&nbsp;Маршала&nbsp;Говорова,&nbsp;7а</p>
                  <a href="#">Карта&nbsp;проїзду</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__social social">
          <div className="social-block">
            <span>Ми у соцмережах</span>
            <div className="social-icon">
              <a href="#" className="social__link _icon-fb"></a>
              <a
                href="https://www.instagram.com/clean_floor_technics/"
                target="_blanck"
                className="social__link _icon-instagram"></a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="page-up"
        style={scroll > 300 ? { transform: 'translateY(-40px)' } : {}}
        onClick={() => window.scrollTo({ top: (0, 0), behavior: 'smooth' })}>
        <div className="upButton-btn _icon-arrow">
          <span>Наверх</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
