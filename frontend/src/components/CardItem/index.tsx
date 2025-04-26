import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Tooltip } from "@mui/material";
import { useGlobalContext } from "@src/hook/useGlobalContext";
import { cartSelector } from "@src/redux/cart/selectors";
import { addToCart } from "@src/redux/cart/slice";
import { ICartItem } from "@src/redux/cart/types";
import { ISanityProduct } from "@src/redux/products/types";
import { useAppDispatch } from "@src/redux/store";
import { euroToHrivna, ibg } from "@src/utils";

export const CardItem: React.FC<ISanityProduct> = ({
  _id,
  label,
  imageUrl,
  article,
  title,
  oldPrice,
  price,
  category,
  discontinued,
  installments,
  availability,
  slug,
}) => {
  const dispatch = useAppDispatch();
  const { items } = useSelector(cartSelector);
  const [isOnCart, setIsOnCart] = React.useState(false);
  const { setIsOpenCart } = useGlobalContext();

  React.useEffect(() => {
    setIsOnCart(items.some((obj) => obj._id === _id));
  }, [_id, items]);

  React.useEffect(() => {
    ibg();
  }, []);

  const onClickAdd = () => {
    const item: ICartItem = {
      _id,
      category,
      imageUrl,
      title,
      oldPrice,
      price,
      slug: slug?.current,
      count: 1,
    };
    dispatch(addToCart(item));
    setIsOpenCart(true);
  };

  const onCartOrDisabled = discontinued
    ? "card__btn disabled"
    : "card__btn inCart";
  const availabilityBlinking = availability
    ? { color: "green", tooltip: "У наявності" }
    : { color: "orange", tooltip: "Під замовлення" };
  const blinkingConfig = discontinued
    ? { color: "red", tooltip: "Знято з виробництва" }
    : availabilityBlinking;

  return (
    <div
      className={discontinued ? "catalog__item discontinued" : "catalog__item"}
    >
      <article className="catalog__card card">
        <Link
          to={`/products/${category}/${slug?.current}`}
          className="card__image ibg"
          title={title}
        >
          <img src={imageUrl} alt={title} />
        </Link>
        <div className="card__labels labels">
          {label?.promo && (
            <div className="labels__item _promo">
              <div className="label-content">Акція</div>
            </div>
          )}
          {label?.popular && (
            <div className="labels__item _popular">
              <p className="label-content">Хіт</p>
            </div>
          )}
          {oldPrice && Number(oldPrice) > euroToHrivna(price || 0) && (
            <div className="labels__item _discount">
              <div className="label-content">
                -
                {Math.round(
                  (100 * (Number(oldPrice) - euroToHrivna(price || 0))) /
                    Number(oldPrice),
                )}
                %
              </div>
            </div>
          )}
          {label?.new && (
            <div className="labels__item _new">
              <div className="label-content">Новинка</div>
            </div>
          )}
        </div>
        {!discontinued && installments && (
          <div className="card__installments">
            <img src="/assets/img/installments/1.png" alt="credit-1" />
            <img src="/assets/img/installments/2.png" alt="credit-2" />
          </div>
        )}
        <div className="card__content">
          <div className="card__article">Артикул: {article}</div>
          <Link
            to={`/products/${category}/${slug?.current}`}
            className="card__title"
            title={title}
          >
            {title}
          </Link>
          <div className="card__cost">
            <div className="card__price">
              {oldPrice && Number(oldPrice) > euroToHrivna(price || 0) && (
                <div className="card__old-price">
                  {Number(oldPrice).toLocaleString()} ₴
                </div>
              )}
              <div className="card__actual-price">
                {euroToHrivna(price || 0).toLocaleString()} ₴
              </div>
            </div>
            <button
              onClick={onClickAdd}
              className={
                isOnCart || discontinued ? onCartOrDisabled : "card__btn"
              }
              disabled={isOnCart || discontinued}
            >
              <span>{isOnCart ? "У кошику" : "Купити"}</span>
            </button>
            <Tooltip title={blinkingConfig.tooltip}>
              <div
                className="blinking-dot"
                style={{ backgroundColor: blinkingConfig.color }}
              />
            </Tooltip>
          </div>
        </div>
      </article>
    </div>
  );
};
