import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CartItem from '../components/CartItem';
import { cartSelector } from '../redux/slices/cartSlice';
import { isWebp, ibg } from '../js/modules/functions';

const Cart = () => {
  const { items, totalPrice } = useSelector(cartSelector);
  const navigate = useNavigate();

  React.useEffect(() => {
    ibg();
    isWebp();
    if (!items.length > 0) {
      navigate('/catalog');
    }
  }, [items]);

  return (
    <section className="cart">
      <div className="cart__container">
        <div className="cart__title">Оформлення замовлення</div>
        <div className="cart__body">
          <div className="cart__user">
            <form action="submit" className="cart__form form-cart">
              <h2 className="form-cart__title">Одержувач замовлення</h2>
              <label htmlFor="nameOrder">
                <span>ПІБ</span>
                <input type="text" name="nameOrder" id="nameOrder" />
              </label>
              <label htmlFor="telOrder">
                <span>Телефон</span>
                <input type="tel" name="telOrder" id="telOrder" />
              </label>
              <div className="btn-block">
                <button className="btn" type="submit">
                  <span>Оформити замовлення</span>
                </button>
              </div>
            </form>
          </div>
          <div className="cart__order-list">
            <h3>Ваше замовлення</h3>
            <div className="order-list__body">
              <ul className="order-list__items">
                {items.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
              </ul>
            </div>
            <div className="order-list__summary">
              <h4>Разом: </h4>
              <p>{totalPrice.toLocaleString()} ₴</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
