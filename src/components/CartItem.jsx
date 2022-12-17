import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { decrement, increment, removeFromCart } from '../redux/slices/cartSlice';

const CartItem = ({ id, title, imageUrl, oldPrice, price, count, category }) => {
  const dispatch = useDispatch();

  const onClickRemoveItem = () => {
    if (window.confirm('Видалити товар з кошика?')) {
      dispatch(removeFromCart(id));
    }
  };

  const onClickMinus = (id) => {
    dispatch(decrement(id));
  };

  const onClickPlus = (id) => {
    dispatch(increment(id));
  };

  return (
    <li className="order-list__item item-order">
      <div className="item-order__img ibg">
        <img src={`assets/img/products/${imageUrl}`} alt="product img" />
      </div>
      <div className="item-order__content">
        <div className="item-order__title">
          <Link to={`/product/${category}/${id}`}>{title}</Link>
          <span onClick={onClickRemoveItem} className="_icon-removeItem"></span>
        </div>
        <div className="item-order__price">
          {oldPrice !== '' && <span className="old-price">{oldPrice.toLocaleString()} ₴</span>}
          <span className="actual-price">{price.toLocaleString()} ₴</span>
        </div>
        <div className="item-order__control">
          <div className="item-order__quantity">
            <button
              disabled={count === 1 ? true : false}
              onClick={() => onClickMinus(id)}
              className="btn-item__minus _icon-minus"></button>
            <p className="counter">{count}</p>
            <button onClick={() => onClickPlus(id)} className="btn-item__plus _icon-plus"></button>
          </div>
          <div className="item-order__cost">{(price * count).toLocaleString()} ₴</div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
