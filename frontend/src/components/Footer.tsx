import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../hooks/useGlobalContext";
import { filterSelector } from "../redux/filter/selectors";
import { setFilter } from "../redux/filter/slice";
import { useAppDispatch } from "../redux/store";
import { categoriesList, menuListArr, toggleFilter } from "../utils";

export const Footer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { setIsOpenCallback, setIsOpenMap, isWebpImg } = useGlobalContext();
  const { filterState } = useSelector(filterSelector);
  const [scroll, setScroll] = React.useState(0);
  const currentYear = new Date().getUTCFullYear();

  const handleScroll = () => setScroll(window.scrollY);

  const handleToggle = (value: string) => {
    const filter = toggleFilter(value, filterState);
    dispatch(setFilter(filter));
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__layout">
          <div className="footer__copyright copyright">
            <a href="/" className="copyright__logo ibg">
              <img
                src={`/assets/img/logo/logo-transparent${
                  isWebpImg ? ".webp" : ".png"
                }`}
                alt="logo"
              />
            </a>
            <div className="copyright__text">
              <h1>© Інтернет-магазин Clean&nbsp;Floor&nbsp;Technics</h1>
              <p>{`2021-${currentYear}`}</p>
              <p>
                Created by{" "}
                <a href="https://github.com/teslmik">Mikhaylo&nbsp;Teslenko</a>
              </p>
            </div>
          </div>
          <div className="footer__catalog">
            <div className="title-footer">Каталог</div>
            <div className="footer__list">
              {categoriesList.map((obj, i) => (
                <Link
                  key={i}
                  onClick={() => handleToggle(obj.name)}
                  to={"catalog"}
                  className="footer__link"
                >
                  <span>{obj.value}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="footer__clients">
            <div className="title-footer">Клієнтам</div>
            <div className="footer__list">
              {menuListArr.map((item, i) => (
                <Link key={i} to={item.link} className="footer__link">
                  {item.name}
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
                    <a
                      className="_icon-viber"
                      href="viber://chat?number=%2B380661416662/"
                    >
                      066 141-66-62
                    </a>
                  </div>
                </div>
                <div
                  onClick={() => setIsOpenCallback(true)}
                  className="actions__phones-text"
                >
                  <span>Передзвонити Вам?</span>
                </div>
              </div>
              <div className="contacts-footer__info">
                <a className="_icon-mail" href="mailto:info@cleanfloor.com.ua">
                  info@cleanfloor.com.ua
                </a>
                <div className="contacts-footer__location _icon-location">
                  <p>Одеса, вул.&nbsp;Маршала&nbsp;Говорова,&nbsp;7а</p>
                  <div onClick={() => setIsOpenMap(true)}>
                    <span>Карта&nbsp;проїзду</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__social social">
          <div className="social-block">
            <span>Ми у соцмережах</span>
            <div className="social-icon">
              <a href="/#" className="social__link">
                <i className="_icon-fb"></i>
              </a>
              <a
                href="https://www.instagram.com/clean_floor_technics/"
                target="_blanck"
                className="social__link"
              >
                <i className="_icon-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="page-up"
        style={scroll > 300 ? { transform: "translateY(-40px)" } : {}}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <div className="upButton-btn _icon-arrow">
          <span>Наверх</span>
        </div>
      </div>
    </footer>
  );
};
