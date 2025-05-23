import { motion, MotionProps } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useGlobalContext } from "@src/hooks/useGlobalContext";
import { cartSelector } from "@src/redux/cart/selectors";
import { decrement, increment, removeFromCart } from "@src/redux/cart/slice";
import { useAppDispatch } from "@src/redux/store";
import { dropIn, euroToHrivna, ibg } from "@src/utils";
import styles from "./CartPopup.module.scss";

export const CartPopup: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, totalPrice } = useSelector(cartSelector);
  const { setIsOpenCart, windowWidth } = useGlobalContext();

  const navigate = useNavigate();

  const onClickCartButton = () => {
    navigate("cart");
    setIsOpenCart(false);
  };

  const onClickRemoveItem = (id: string) => {
    if (window.confirm("Видалити товар з кошика?")) {
      dispatch(removeFromCart(id));
      if (items.length === 1) {
        setIsOpenCart(false);
      }
    }
  };

  const onClickMinus = (id: string) => {
    dispatch(decrement(id));
  };

  const onClickPlus = (id: string) => {
    dispatch(increment(id));
  };

  const onClickCloseCartMobile = () => {
    if (windowWidth < 683) {
      setIsOpenCart(false);
    }
  };

  const animateDesktop: MotionProps = {
    variants: dropIn,
    initial: "hidden",
    animate: "visible",
    exit: "exit",
  };

  const animateMobile: MotionProps = {
    initial: { transform: `translateX(320px)` },
    animate: { transform: `translateX(0px)` },
    exit: { transform: `translateX(320px)` },
    transition: { duration: 0.2 },
  };

  const animateParams =
    windowWidth < 683 ? { ...animateMobile } : { ...animateDesktop };

  React.useEffect(() => {
    ibg();
  });

  return (
    <motion.div
      initial={{ opacity: 0, overflowX: "hidden" }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.popup}
      onClick={() => setIsOpenCart(false)}
    >
      <div className={styles.body}>
        <motion.div
          className={styles.content}
          onClick={(e) => e.stopPropagation()}
          {...animateParams}
        >
          <div
            onClick={() => setIsOpenCart(false)}
            className={`${styles.cart_close} _icon-close`}
            role="button"
            tabIndex={0}
          />
          <div
            className={styles.title}
            onClick={onClickCloseCartMobile}
            role="button"
            tabIndex={0}
          >
            <span className="_icon-arrow"></span>
            <p>Кошик</p>
          </div>
          <div className={styles.cart__body}>
            <div className={styles.cart__header}>
              <div className={styles.header__text}>Кількість</div>
              <div className={styles.header__text}>Вартість</div>
            </div>
            <ul className={styles.cart__section}>
              {items.map((item) => (
                <li key={item._id} className={styles.cart_item}>
                  <span
                    onClick={() => onClickRemoveItem(item._id)}
                    role="button"
                    tabIndex={0}
                    className={`${styles.removItem} _icon-removeItem`}
                  />
                  <div className={`${styles.item__img} ibg`}>
                    <img src={item.imageUrl} alt={item.imageUrl} />
                  </div>
                  <div className={styles.item__body}>
                    <div className={styles.item__content}>
                      <div
                        onClick={() => setIsOpenCart(false)}
                        role="button"
                        tabIndex={0}
                        className={styles.item__title}
                      >
                        <Link to={`/products/${item.category}/${item.slug}`}>
                          {item.title}
                        </Link>
                      </div>
                      <div className={styles.item__price}>
                        {item.oldPrice && (
                          <div className={styles.item__oldPrice}>
                            {Number(item.oldPrice).toLocaleString()} ₴
                          </div>
                        )}
                        <div className={styles.item__actualPrice}>
                          {euroToHrivna(item.price || 0).toLocaleString()} ₴
                        </div>
                      </div>
                    </div>
                    <div className={styles.item__control}>
                      <div className={styles.item__quantity}>
                        <button
                          disabled={item.count === 1}
                          onClick={() => onClickMinus(item._id)}
                          className={`${styles.btn_item__minus} _icon-minus`}
                        />
                        <p className={styles.counter}>{item.count}</p>
                        <button
                          onClick={() => onClickPlus(item._id)}
                          className={`${styles.btn_item__plus} _icon-plus`}
                        />
                      </div>
                      <div className={styles.item__cost}>
                        <div className="item-order__cost">
                          {(
                            euroToHrivna(item.price || 0) * item.count
                          ).toLocaleString()}{" "}
                          ₴
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.cart__footer}>
              <div className={styles.footer__top}>
                <div className={styles.top__text}>Разом </div>
                <div className={styles.top__cost}>
                  {totalPrice.toLocaleString()} ₴
                </div>
              </div>
              <div className={styles.footer__bottom}>
                <p
                  onClick={() => setIsOpenCart(false)}
                  className={`${styles.bottom__back} _icon-arrow-left`}
                >
                  Повернутися к покупкам
                </p>
                <button onClick={onClickCartButton} className={styles.btn}>
                  <span>Оформити замовлення</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
