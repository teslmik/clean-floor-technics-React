import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { CartItem, IDataMessage } from "../components";
import { useGlobalContext } from "../hook/useGlobalContext";
import Head from "../layouts/Head";
import { cartSelector } from "../redux/cart/selectors";
import { clearCart } from "../redux/cart/slice";
import { euroToHrivna, ibg } from "../utils";

const URL = `https://api.telegram.org/bot${
  import.meta.env.VITE_APP_TOKEN_TG
}/sendMessage`;

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector(cartSelector);
  const { setRequestDone } = useGlobalContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IDataMessage>({ mode: "onBlur" });

  const onSubmitCallback = async (data: IDataMessage) => {
    let message = `<b>Замовлення з сайту!!!</b> &#129297;&#128077;&#128230;\n`;
    message += `<b>Замовник:</b> ${data.name}\n`;
    message += `<b>Номер телефону:</b> ${data.phone}\n\n`;
    message += `<b>Замовлення:</b>\n\n`;
    message += items
      .map(
        (item, i) =>
          `<i>${i + 1}. ${item.title} ${item.count} шт.</i> - <b>${(
            item.count * euroToHrivna(item.price)
          ).toLocaleString()}</b> грн.\n\n`,
      )
      .join("");

    if (data.installments) {
      message += `&#9989; <b>Оформлення Розстрочки</b>\n\n`;
    }

    message += `<b>УСЬОГО: ${totalPrice.toLocaleString()} грн.</b>`;

    await axios
      .post(URL, {
        chat_id: import.meta.env.VITE_APP_CHAT_ID,
        parse_mode: "html",
        text: message,
      })
      .then(() => {
        setRequestDone({
          isOpen: true,
          title: "Замовлення прийнято!",
          text: `Очікуйте на дзвінок від менеджера для уточнення деталей замовлення, способу оплати та доставки...`,
        });
        dispatch(clearCart());
      })
      .catch((error) =>
        setRequestDone({
          isOpen: true,
          title: "Виникла помилка! ⚠",
          text:
            "При роботі серверу виникла помилка: " +
            error.message +
            ". Спробуйте пізніше...",
        }),
      )
      .finally(() => reset());
  };

  React.useEffect(() => {
    ibg();

    if (items.length < 1) {
      navigate("/catalog");
    }
  }, [items, navigate]);

  return (
    <section className="cart">
      <Head title={"Кошик"} url={pathname} />
      <div className="cart__container">
        <div className="cart__title">Оформлення замовлення</div>
        <div className="cart__body">
          <div className="cart__user">
            <form
              className="cart__form form-cart"
              onSubmit={handleSubmit(onSubmitCallback)}
            >
              <h2 className="form-cart__title">Одержувач замовлення</h2>
              <label htmlFor="nameOrder">
                <span>Прізвище, Ім&apos;я</span>
                <input
                  id="nameOrder"
                  placeholder="Ваше Ім'я та Прізвище"
                  type="text"
                  {...register("name", {
                    required: `Заповніть поле!`,
                    minLength: {
                      value: 3,
                      message: `Введіть ім'я менше 3-х літер!`,
                    },
                    pattern: {
                      value:
                        /^([А-Яа-яA-Za-z]{1}[А-Яа-яA-Za-zЁёІі]{1,23})[\s]([А-Яа-яA-Za-z]{1}[А-Яа-яA-Za-zЁёІі]{1,23})?$/,
                      message: `Невірний формат Ім'я та Прізвища!`,
                    },
                  })}
                />
                {errors?.name && <p>{errors?.name?.message}</p>}
              </label>
              <label htmlFor="telOrder">
                <span>Телефон</span>
                <input
                  id="telOrder"
                  placeholder="+380970948777 чи 0661416662"
                  type="phone"
                  {...register("phone", {
                    required: `Заповніть поле!`,
                    pattern: {
                      value: /^\+?[380]?\d{9}/g,
                      message: `Невірний формат номеру телефона!`,
                    },
                  })}
                />
                {errors?.phone && <p>{errors?.phone?.message}</p>}
              </label>
              <label htmlFor="installments" className="installments">
                <input
                  id="installments"
                  type="checkbox"
                  {...register("installments")}
                />
                <span>
                  Оформити у{" "}
                  <img
                    width={30}
                    src="/assets/img/installments/2.png"
                    alt="credit-2"
                  />{" "}
                  &quot;Оплату частинами&quot; чи{" "}
                  <img
                    width={30}
                    src="/assets/img/installments/1.png"
                    alt="credit-1"
                  />{" "}
                  &quot;Миттєву розстрочку&quot; від Приватбанку
                </span>
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
                  <CartItem key={item._id} {...item} />
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
