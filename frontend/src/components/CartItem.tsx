import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { decrement, increment, removeFromCart } from "../redux/cart/slice";
import { euroToHrivna } from "../utils";

interface ICartItemProps {
  _id: string;
  title: string;
  imageUrl: string;
  oldPrice: number | null;
  price: number;
  count: number;
  category: string;
  slug: string;
}

export const CartItem: React.FC<ICartItemProps> = ({
  _id,
  title,
  imageUrl,
  oldPrice,
  price,
  count,
  category,
  slug,
}) => {
  const dispatch = useDispatch();

  const onClickRemoveItem = () => {
    if (window.confirm("Видалити товар з кошика?")) {
      dispatch(removeFromCart(_id));
    }
  };

  const onClickMinus = (id: string) => {
    dispatch(decrement(id));
  };

  const onClickPlus = (id: string) => {
    dispatch(increment(id));
  };

  return (
    <li className="order-list__item item-order">
      <div className="item-order__img ibg">
        <img src={imageUrl} alt="product img" />
      </div>
      <div className="item-order__content">
        <div className="item-order__title">
          <Link to={`/products/${category}/${slug}`}>{title}</Link>
          <span
            onClick={onClickRemoveItem}
            role="button"
            tabIndex={0}
            className="_icon-removeItem"
          ></span>
        </div>
        <div className="item-order__price">
          {oldPrice && (
            <span className="old-price">
              {Number(oldPrice).toLocaleString()} ₴
            </span>
          )}
          <span className="actual-price">
            {euroToHrivna(price).toLocaleString()} ₴
          </span>
        </div>
        <div className="item-order__control">
          <div className="item-order__quantity">
            <button
              disabled={count === 1}
              onClick={() => onClickMinus(_id)}
              className="btn-item__minus _icon-minus"
            ></button>
            <p className="counter">{count}</p>
            <button
              onClick={() => onClickPlus(_id)}
              className="btn-item__plus _icon-plus"
            ></button>
          </div>
          <div className="item-order__cost">
            {(euroToHrivna(price) * count).toLocaleString()} ₴
          </div>
        </div>
      </div>
    </li>
  );
};
