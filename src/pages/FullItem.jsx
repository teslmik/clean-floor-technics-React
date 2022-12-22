import axios from 'axios';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { AppContext } from '../App.js';
import Breadcrumbs from '../components/Breadcrumbs/index.jsx';
import SwiperItem from '../components/SwiperItem.jsx';
import { da } from '../js/modules/dynamicAdapt.js';
import { ibg, tabsItem } from '../js/modules/functions.js';
import { addToCart, cartSelector } from '../redux/slices/cartSlice.js';

const FullItem = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(cartSelector);
  const [product, setProduct] = React.useState();
  const [toggleState, setToggleState] = React.useState(0);
  const { setIsOpenCart, isOnCart, setIsOnCart } = React.useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scroll(0, 0);
    
    async function fetchProduct() {
      try {
        setProduct();
        const { data } = await axios.get(
          `https://636e34f8b567eed48ad655d0.mockapi.io/products/${id}`,
        );
        setProduct(data);

        items.find((obj) => obj.id === id) ? setIsOnCart(true) : setIsOnCart(false);

        ibg();
      } catch (error) {
        alert('Товар не знайдено, спробуйте пізніше...');
        console.log(error.message);
        navigate('/catalog');
      }
    }
    fetchProduct();
  }, [navigate, id, isOnCart, items]);

  const dinamycAdapt = () => {
    da.init();
  };

  React.useEffect(() => {
    da.init();
    ibg();

    window.addEventListener('resize', dinamycAdapt);

    return () => {
      window.removeEventListener('resize', dinamycAdapt);
    };
  });

  const onClickAdd = () => {
    const { imageUrl, title, oldPrice, price } = product;
    const item = {
      id,
      imageUrl,
      title,
      oldPrice,
      price,
      count: 1,
    };
    dispatch(addToCart(item));
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
      <div className="fullitem__content">
        <div className="fullitem__wrapper">
          <SwiperItem title={product.title} article={product.article} imageArr={product.imageArr} />
        </div>
        <div className="fullitem__body body-fullitem">
          <div className="body-fullitem__top">
            <div data-da=".fullitem__container,682,first">
              <Breadcrumbs title={product.title} category={product.category} />
            </div>
            <div className="body-fullitem__header fullitem-header">
              <div className="fullitem-header__text">
                <h1 className="fullitem-header__title">{product.title}</h1>
                <div
                  data-da=".body-fullitem__btn,682,first"
                  className="fullitem-header__availability">
                  {product.availability ? 'В наявності' : 'Під замовлення'}
                </div>
              </div>
              {product.article && (
                <div className="fullitem-header__article">
                  <span>Артикул:</span>
                  <p>{product.article}</p>
                </div>
              )}
            </div>
            <div data-da=".body-fullitem__btn,682,1" className="body-fullitem__price">
              <div className="body-fullitem__actual-price">{product.price.toLocaleString()} ₴</div>
              {product.oldPrice && (
                <div className="body-fullitem__old-price">
                  {product.oldPrice.toLocaleString()} ₴
                </div>
              )}
            </div>
          </div>
          <div data-da=".fullitem__content,682,0" className="body-fullitem__bottom">
            <div data-da=".fullitem__wrapper,682,2" className="body-fullitem__btn">
              <button
                onClick={onClickAdd}
                className={isOnCart ? 'inCart' : ''}
                disabled={isOnCart && true}>
                <span>{isOnCart ? 'У кошику' : 'Купити'}</span>
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
                    <p>— Гарантія від виробника 24 місяці</p>
                    <p>— Обмін/повернення товару впродовж 14 днів</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        data-da=".body-fullitem__bottom,682,first"
        className="fullitem__discription discription-fullitem">
        <div className="discription-fullitem__title">Короткий опис товару</div>
        <span className="discription-fullitem__text">
          {product.description &&
            product.description.map((str, i) => <ReactMarkdown key={i}>{str}</ReactMarkdown>)}
        </span>
      </div>
    </section>
  );
};

export default FullItem;
