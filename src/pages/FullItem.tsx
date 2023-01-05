import axios from 'axios';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Breadcrumbs from '../components/Breadcrumbs';
import SwiperItem from '../components/SwiperItem';
import { addToCart, cartSelector } from '../redux/slices/cartSlice';
import { IProductItem } from '../redux/slices/productsSlice';
import { tabsItem } from '../utils/listConstant.js';
import { euroToHrivna } from '../utils/euroToHrivna.js';
import { useGlobalContext } from '../hook/useGlobalContext';

const FullItem: React.FC = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(cartSelector);
  const [product, setProduct] = React.useState<IProductItem>();
  const [toggleState, setToggleState] = React.useState(0);
  const { setIsOpenCart, windowWidth } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const isItemOnCart = items.find((obj) => obj.id === id) ? true : false;

  React.useEffect(() => {
    window.scroll(0, 0);
    async function fetchProduct() {
      try {
        setProduct(undefined);
        const { data } = await axios.get(
          `https://636e34f8b567eed48ad655d0.mockapi.io/products/${id}`,
        );
        setProduct(data);
      } catch (error) {
        alert('Товар не знайдено, спробуйте пізніше...');
        navigate('/catalog');
      }
    }
    fetchProduct();
  }, [navigate]);

  const onClickAdd = () => {
    product && dispatch(addToCart(product));
    setIsOpenCart(true);
  };

  if (!product) {
    return (
      <section className="fullitem__container">
        <div className="loader">Loading...</div>
      </section>
    );
  }

  return (
    <section className="fullitem__container">
      {windowWidth < 683 && <Breadcrumbs title={product.title} category={product.category} />}
      <div className="fullitem__content">
        {windowWidth < 683 && (
          <div className="body-fullitem__bottom">
            <div className="fullitem__discription discription-fullitem">
              <div className="discription-fullitem__title">Короткий опис товару</div>
              <span className="discription-fullitem__text">
                {product.description &&
                  product.description.map((str, i) => <ReactMarkdown key={i}>{str}</ReactMarkdown>)}
              </span>
            </div>
            <div className="body-fullitem__specification specification">
              <div className="specification__text">
                <div className="specification__title">Характеристики </div>
                <div className="specification__list">
                  {product.specification &&
                    product.specification.map((item, i) => (
                      <React.Fragment key={i}>
                        <p className="list-first">{item.name}</p>
                        <p className="list-second">{item.value}</p>
                      </React.Fragment>
                    ))}
                </div>
              </div>
              <div className="specification__tabs tabs-specification">
                <nav className="tabs-specification__header">
                  {tabsItem.map((tab, i) => (
                    <div
                      key={tab}
                      onClick={() => setToggleState(i)}
                      className={
                        toggleState === i
                          ? 'tabs-specification__text active'
                          : 'tabs-specification__text'
                      }>
                      {tab}
                    </div>
                  ))}
                </nav>
                <div className="tabs-specification__content">
                  <div
                    className={
                      toggleState === 0
                        ? 'tabs-specification__body active'
                        : 'tabs-specification__body'
                    }>
                    <p>— Новою поштой по Україні — за тарифами перевізника</p>
                    <p>— Кур'єром по Одесі — безкоштовно</p>
                    <p>
                      <Link to={'/pay_and_delivery'}>Детальніше про доставку</Link>
                    </p>
                  </div>
                  <div
                    className={
                      toggleState === 1
                        ? 'tabs-specification__body active'
                        : 'tabs-specification__body'
                    }>
                    <p>— Готівкою при отриманні</p>
                    <p>— Безготівковий розрахунок для юридичних та фізичних осіб</p>
                    <p>— Розстрочка до 9 місяців від Укрсиббанку</p>
                  </div>
                  <div
                    className={
                      toggleState === 2
                        ? 'tabs-specification__body active'
                        : 'tabs-specification__body'
                    }>
                    <p>— Гарантія від виробника 12 місяців</p>
                    <p>— Обмін/повернення товару впродовж 14 днів</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="fullitem__wrapper">
          <SwiperItem
            title={product.title}
            article={product.article}
            imageArr={product.imageArr}
            label={product.label}
            oldPrice={product.oldPrice}
            price={product.price}
          />
          {windowWidth < 683 && (
            <div className="body-fullitem__btn">
              <div className="fullitem-header__availability">
                {product.availability ? 'В наявності' : 'Під замовлення'}
              </div>
              <div className="body-fullitem__price">
                <div className="body-fullitem__actual-price">
                  {euroToHrivna(product.price).toLocaleString()} ₴
                </div>
                {product.oldPrice && (
                  <div className="body-fullitem__old-price">
                    {product.oldPrice.toLocaleString()} ₴
                  </div>
                )}
              </div>
              <button
                onClick={onClickAdd}
                className={isItemOnCart ? 'inCart' : ''}
                disabled={isItemOnCart && true}>
                <span>{isItemOnCart ? 'У кошику' : 'Купити'}</span>
              </button>
            </div>
          )}
        </div>
        <div className="fullitem__body body-fullitem">
          <div className="body-fullitem__top">
            {windowWidth >= 683 && (
              <Breadcrumbs title={product.title} category={product.category} />
            )}
            <div className="body-fullitem__header fullitem-header">
              <div className="fullitem-header__text">
                <h1 className="fullitem-header__title">{product.title}</h1>
                {windowWidth >= 683 && (
                  <div className="fullitem-header__availability">
                    {product.availability ? 'В наявності' : 'Під замовлення'}
                  </div>
                )}
              </div>
              {product.article && (
                <div className="fullitem-header__article">
                  <span>Артикул:</span>
                  <p>{product.article}</p>
                </div>
              )}
            </div>
            {windowWidth >= 683 && (
              <div className="body-fullitem__price">
                <div className="body-fullitem__actual-price">
                  {euroToHrivna(product.price).toLocaleString()} ₴
                </div>
                {product.oldPrice && (
                  <div className="body-fullitem__old-price">
                    {product.oldPrice.toLocaleString()} ₴
                  </div>
                )}
              </div>
            )}
          </div>
          {windowWidth >= 683 && (
            <div className="body-fullitem__bottom">
              <div className="body-fullitem__btn">
                <button
                  onClick={onClickAdd}
                  className={isItemOnCart ? 'inCart' : ''}
                  disabled={isItemOnCart && true}>
                  <span>{isItemOnCart ? 'У кошику' : 'Купити'}</span>
                </button>
              </div>
              <div className="body-fullitem__specification specification">
                <div className="specification__text">
                  <div className="specification__title">Характеристики </div>
                  <div className="specification__list">
                    {product.specification &&
                      product.specification.map((item, i) => (
                        <React.Fragment key={i}>
                          <p className="list-first">{item.name}</p>
                          <p className="list-second">{item.value}</p>
                        </React.Fragment>
                      ))}
                  </div>
                </div>
                <div className="specification__tabs tabs-specification">
                  <nav className="tabs-specification__header">
                    {tabsItem.map((tab, i) => (
                      <div
                        key={tab}
                        onClick={() => setToggleState(i)}
                        className={
                          toggleState === i
                            ? 'tabs-specification__text active'
                            : 'tabs-specification__text'
                        }>
                        {tab}
                      </div>
                    ))}
                  </nav>
                  <div className="tabs-specification__content">
                    <div
                      className={
                        toggleState === 0
                          ? 'tabs-specification__body active'
                          : 'tabs-specification__body'
                      }>
                      <p>— Новою поштой по Україні — за тарифами перевізника</p>
                      <p>— Кур'єром по Одесі — безкоштовно</p>
                      <p>
                        <Link to={'/pay_and_delivery'}>Детальніше про доставку</Link>
                      </p>
                    </div>
                    <div
                      className={
                        toggleState === 1
                          ? 'tabs-specification__body active'
                          : 'tabs-specification__body'
                      }>
                      <p>— Готівкою при отриманні</p>
                      <p>— Безготівковий розрахунок для юридичних та фізичних осіб</p>
                      <p>— Розстрочка до 9 місяців від Укрсиббанку</p>
                    </div>
                    <div
                      className={
                        toggleState === 2
                          ? 'tabs-specification__body active'
                          : 'tabs-specification__body'
                      }>
                      <p>— Гарантія від виробника 12 місяців</p>
                      <p>— Обмін/повернення товару впродовж 14 днів</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {windowWidth >= 683 && (
        <div className="fullitem__discription discription-fullitem">
          <div className="discription-fullitem__title">Короткий опис товару</div>
          <span className="discription-fullitem__text">
            {product.description &&
              product.description.map((str, i) => <ReactMarkdown key={i}>{str}</ReactMarkdown>)}
          </span>
        </div>
      )}
    </section>
  );
};

export default FullItem;
