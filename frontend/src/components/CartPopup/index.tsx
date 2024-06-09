import React from "react";
import { motion, MotionProps } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { euroToHrivna, dropIn, ibg } from "../../utils";
import { useGlobalContext } from "../../hook/useGlobalContext";
import { cartSelector } from "../../redux/cart/selectors";
import { removeFromCart, decrement, increment } from "../../redux/cart/slice";

import styles from "./CartPopup.module.scss";

export const CartPopup: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector(cartSelector);
  const { setIsOpenCart, windowWidth, isWebpImg } = useGlobalContext();

  const navigate = useNavigate();

  const onClickCartButton = () => {
    navigate("cart");
    setIsOpenCart(false);
  };

  const onClickRemoveItem = (id: string) => {
    if (window.confirm("Видалити товар з кошика?")) {
      dispatch(removeFromCart(id));
      items.length === 1 && setIsOpenCart(false);
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
    return;
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
          ></div>
          <div className={styles.title} onClick={onClickCloseCartMobile}>
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
                    className={`${styles.removItem} _icon-removeItem`}
                  ></span>
                  <div className={`${styles.item__img} ibg`}>
                    <img
                      src={`/assets/img/products/${item.imageUrl}${
                        isWebpImg ? ".webp" : ".png"
                      }`}
                      alt=""
                    />
                  </div>
                  <div className={styles.item__body}>
                    <div className={styles.item__content}>
                      <div
                        onClick={() => setIsOpenCart(false)}
                        className={styles.item__title}
                      >
                        <Link to={`/products/${item.category}/${item._id}`}>
                          {item.title}
                        </Link>
                      </div>
                      <div className={styles.item__price}>
                        {item.oldPrice !== "" && (
                          <div className={styles.item__oldPrice}>
                            {item.oldPrice.toLocaleString()} ₴
                          </div>
                        )}
                        <div className={styles.item__actualPrice}>
                          {euroToHrivna(item.price).toLocaleString()} ₴
                        </div>
                      </div>
                    </div>
                    <div className={styles.item__control}>
                      <div className={styles.item__quantity}>
                        <button
                          disabled={item.count === 1 ? true : false}
                          onClick={() => onClickMinus(item._id)}
                          className={`${styles.btn_item__minus} _icon-minus`}
                        ></button>
                        <p className={styles.counter}>{item.count}</p>
                        <button
                          onClick={() => onClickPlus(item._id)}
                          className={`${styles.btn_item__plus} _icon-plus`}
                        ></button>
                      </div>
                      <div className={styles.item__cost}>
                        <div className="item-order__cost">
                          {(
                            euroToHrivna(item.price) * item.count
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
