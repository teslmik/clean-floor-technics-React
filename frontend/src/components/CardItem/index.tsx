import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../../hook/useGlobalContext";
import { cartSelector } from "../../redux/cart/selectors";
import { addToCart } from "../../redux/cart/slice";
import { ICartItem } from "../../redux/cart/types";
import { IProductItem } from "../../redux/products/types";
import { euroToHrivna, ibg } from "../../utils";
import { Tooltip } from "@mui/material";

export const CardItem: React.FC<IProductItem> = ({
  _id,
  label,
  imageUrl,
  article,
  title,
  oldPrice,
  price,
  category,
  discontinued,
  installments = true,
  availability,
}) => {
  const dispatch = useDispatch();
  const { items } = useSelector(cartSelector);
  const [isOnCart, setIsOnCart] = React.useState(false);
  const { setIsOpenCart, isWebpImg } = useGlobalContext();

  React.useEffect(() => {
    items.find((obj) => obj._id === _id)
      ? setIsOnCart(true)
      : setIsOnCart(false);
  }, [_id, isOnCart, items]);

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
      count: 1,
    };
    dispatch(addToCart(item));
    setIsOpenCart(true);
  };

  const onCartOrDisabled = discontinued
    ? "card__btn disabled"
    : "card__btn inCart";
  const blinkingConfig = discontinued
    ? { color: "red", tooltip: "Знято з виробництва" }
    : availability
    ? { color: "green", tooltip: "У наявності" }
    : { color: "orange", tooltip: "Під замовлення" };

  return (
    <div
      className={discontinued ? "catalog__item discontinued" : "catalog__item"}
    >
      <article className="catalog__card card">
        <Link
          to={`/products/${category}/${_id}`}
          className="card__image ibg"
          title={title}
        >
          <img
            src={`/assets/img/products/${imageUrl}${
              isWebpImg ? ".webp" : ".png"
            }`}
            alt={title}
          />
        </Link>
        <div className="card__labels labels">
          {label._promo && (
            <div className="labels__item _promo">
              <div className="label-content">Акція</div>
            </div>
          )}
          {label._popular && (
            <div className="labels__item _popular">
              <p className="label-content">Хіт</p>
            </div>
          )}
          {oldPrice && (
            <div className="labels__item _discount">
              <div className="label-content">
                -
                {Math.round(
                  (100 * (Number(oldPrice) - euroToHrivna(price))) /
                    Number(oldPrice)
                )}
                %
              </div>
            </div>
          )}
          {label._new && (
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
            to={`/products/${category}/${_id}`}
            className="card__title"
            title={title}
          >
            {title}
          </Link>
          <div className="card__cost">
            <div className="card__price">
              {oldPrice && (
                <div className="card__old-price">
                  {Number(oldPrice).toLocaleString()} ₴
                </div>
              )}
              <div className="card__actual-price">
                {euroToHrivna(price).toLocaleString()} ₴
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
