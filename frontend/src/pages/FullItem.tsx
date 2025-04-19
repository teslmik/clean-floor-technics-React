import { PictureAsPdf } from "@mui/icons-material";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import client from "../../cms/lib/sanitiClient";
import { Breadcrumbs, CircleLoader, SwiperItem } from "../components";
import SanityTextRenderer from "../components/SanityTextRenderer";
import { useGlobalContext } from "../hook/useGlobalContext";
import Head from "../layouts/Head";
import { cartSelector } from "../redux/cart/selectors";
import { addToCart } from "../redux/cart/slice";
import { ICartItem } from "../redux/cart/types";
import { fullProductFields } from "../redux/products/query";
import { productsSelector } from "../redux/products/selectors";
import { ISanityProduct } from "../redux/products/types";
import { fetchRates } from "../redux/rates/asyncActions";
import { useAppDispatch } from "../redux/store";
import { euroToHrivna, tabsItem } from "../utils";

const FullItem: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useSelector(cartSelector);
  const {
    items: { products },
  } = useSelector(productsSelector);

  const [product, setProduct] = React.useState<ISanityProduct | null>(null);
  const [cartItem, setCartItem] = React.useState<ICartItem>();
  const [toggleState, setToggleState] = React.useState(0);
  const { setIsOpenCart, windowWidth } = useGlobalContext();
  const { slug } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isItemOnCart = !!items.find((obj) => obj._id === product?._id);

  React.useEffect(() => {
    window.scroll(0, 0);
    setProduct(null);

    const fetchProduct = async () => {
      try {
        dispatch(fetchRates());

        let current = products.find((p) => p.slug?.current === slug);
        if (!current) {
          const query = `*[_type == "products" && slug.current == $slug][0]{ ${fullProductFields} }`;
          current = await client.fetch<ISanityProduct>(query, { slug });
        }

        if (!current) throw new Error("Product not found");

        setProduct(current);

        const {
          _id,
          category,
          imageUrl,
          title,
          oldPrice,
          price,
          slug: productSlug,
        } = current;

        setCartItem({
          _id,
          category,
          imageUrl,
          title,
          oldPrice,
          price,
          slug: productSlug?.current,
          count: 1,
        });
      } catch (e: unknown) {
        alert("Товар не знайдено, спробуйте пізніше...");
        console.error(e);
        navigate("/catalog");
      }
    };

    fetchProduct();
  }, [slug]);

  const onClickAdd = () => {
    if (cartItem) dispatch(addToCart(cartItem));
    setIsOpenCart(true);
  };

  const onCartOrDisabled = isItemOnCart ? "inCart" : "disabled";

  if (!product) {
    return <CircleLoader />;
  }

  return (
    <section className="fullitem__container">
      <Head
        title={product.title || ""}
        url={pathname}
        imageUrl={`products/${product.imageUrl}.png`}
      />
      {windowWidth < 683 && (
        <Breadcrumbs title={product.title} category={product.category} />
      )}
      <div className="fullitem__content">
        {windowWidth < 683 && (
          <div className="body-fullitem__bottom">
            <div className="fullitem__discription discription-fullitem">
              <div className="discription-fullitem__title">
                Короткий опис товару
              </div>
              <div className="discription-fullitem__text">
                <SanityTextRenderer content={product.description} />
              </div>
            </div>
            <Link className="catalog-link" to="/price_list">
              <span>Завантажити повний каталог товарів</span>
              <PictureAsPdf />
            </Link>
            <div className="body-fullitem__specification specification">
              <div className="specification__text">
                <div className="specification__title">Характеристики </div>
                <div className="specification__list">
                  {product?.specification?.map((item) => (
                    <React.Fragment key={item._key}>
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
                      role="button"
                      tabIndex={0}
                      className={
                        toggleState === i
                          ? "tabs-specification__text active"
                          : "tabs-specification__text"
                      }
                    >
                      {tab}
                    </div>
                  ))}
                </nav>
                <div className="tabs-specification__content">
                  <div
                    className={
                      toggleState === 0
                        ? "tabs-specification__body active"
                        : "tabs-specification__body"
                    }
                  >
                    <p>— Новою поштой по Україні — за тарифами перевізника</p>
                    <p>— Кур&apos;єром по Одесі — безкоштовно</p>
                    <p>
                      <Link to={"/pay_and_delivery"}>
                        Детальніше про доставку
                      </Link>
                    </p>
                  </div>
                  <div
                    className={
                      toggleState === 1
                        ? "tabs-specification__body active"
                        : "tabs-specification__body"
                    }
                  >
                    <p>— Готівкою при отриманні</p>
                    <p>
                      — Безготівковий розрахунок для юридичних та фізичних осіб
                    </p>
                    <p>— Розстрочка до 9 місяців від Укрсиббанку</p>
                  </div>
                  <div
                    className={
                      toggleState === 2
                        ? "tabs-specification__body active"
                        : "tabs-specification__body"
                    }
                  >
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
            imageArr={product.imageArr}
            label={product.label}
            oldPrice={product.oldPrice}
            price={product.price}
          />
          {windowWidth < 683 && (
            <div className="body-fullitem__btn">
              <div
                className={
                  product.discontinued
                    ? "fullitem-header__availability discontinued"
                    : "fullitem-header__availability"
                }
              >
                {product.discontinued
                  ? "Знятий з виробництва"
                  : product.availability
                    ? "В наявності"
                    : "Під замовлення"}
              </div>
              <div className="body-fullitem__price">
                <div className="body-fullitem__actual-price">
                  {euroToHrivna(product.price).toLocaleString()} ₴
                </div>
                {product.oldPrice &&
                  Number(product.oldPrice) > euroToHrivna(product.price) && (
                    <div className="body-fullitem__old-price">
                      {Number(product.oldPrice).toLocaleString()} ₴
                    </div>
                  )}
              </div>
              <button
                onClick={onClickAdd}
                className={isItemOnCart ? "inCart" : ""}
                disabled={isItemOnCart}
              >
                <span>{isItemOnCart ? "У кошику" : "Купити"}</span>
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
                  <div
                    className={
                      product.discontinued
                        ? "fullitem-header__availability discontinued"
                        : "fullitem-header__availability"
                    }
                  >
                    {product.discontinued
                      ? "Знятий з виробництва"
                      : product.availability
                        ? "В наявності"
                        : "Під замовлення"}
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
                  {euroToHrivna(product.price || 0).toLocaleString()} ₴
                </div>
                {product.oldPrice &&
                  Number(product.oldPrice) >
                    euroToHrivna(product.price || 0) && (
                    <div className="body-fullitem__old-price">
                      {Number(product.oldPrice).toLocaleString()} ₴
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
                  className={
                    isItemOnCart || product.discontinued ? onCartOrDisabled : ""
                  }
                  disabled={isItemOnCart || product.discontinued}
                >
                  <span>{isItemOnCart ? "У кошику" : "Купити"}</span>
                </button>
              </div>
              <div className="body-fullitem__specification specification">
                <div className="specification__text">
                  <div className="specification__title">Характеристики </div>
                  <div className="specification__list">
                    {product.specification?.map((item) => (
                      <React.Fragment key={item._key}>
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
                        role="button"
                        tabIndex={0}
                        className={
                          toggleState === i
                            ? "tabs-specification__text active"
                            : "tabs-specification__text"
                        }
                      >
                        {tab}
                      </div>
                    ))}
                  </nav>
                  <div className="tabs-specification__content">
                    <div
                      className={
                        toggleState === 0
                          ? "tabs-specification__body active"
                          : "tabs-specification__body"
                      }
                    >
                      <p>— Новою поштой по Україні — за тарифами перевізника</p>
                      <p>— Кур&apos;єром по Одесі — безкоштовно</p>
                      <p>
                        <Link to={"/pay_and_delivery"}>
                          Детальніше про доставку
                        </Link>
                      </p>
                    </div>
                    <div
                      className={
                        toggleState === 1
                          ? "tabs-specification__body active"
                          : "tabs-specification__body"
                      }
                    >
                      <p>— Готівкою при отриманні</p>
                      <p>
                        — Безготівковий розрахунок для юридичних та фізичних
                        осіб
                      </p>
                      <p>
                        — Розстрочка чи оплата частинами від Приватбанку (тільки
                        для власників кредитких карток Приватбанку)
                      </p>
                    </div>
                    <div
                      className={
                        toggleState === 2
                          ? "tabs-specification__body active"
                          : "tabs-specification__body"
                      }
                    >
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
        <>
          <div className="fullitem__discription discription-fullitem">
            <div className="discription-fullitem__title">
              Короткий опис товару
            </div>
            <div className="discription-fullitem__text">
              <SanityTextRenderer content={product.description} />
            </div>
          </div>
          <Link className="catalog-link" to="/price_list">
            <span>Завантажити повний каталог товарів</span>
            <PictureAsPdf />
          </Link>
        </>
      )}
    </section>
  );
};

export default FullItem;
