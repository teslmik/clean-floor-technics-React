import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import { AppContext } from '../../App';
import { dropIn } from '../../js/modules/functions';

import styles from './Callback.module.scss';
import axios from 'axios';

const Callback = () => {
  const URL = `https://api.telegram.org/bot${process.env.REACT_APP_TOKEN_TG}/sendMessage`;

  const { setIsOpenCallback, setRequestDone } = React.useContext(AppContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur' });

  const onSubmitCallback = (data) => {
    let message = `<b>Заявка на дзвінок!!!</b> &#128242;&#128242;&#128242;\n`;
    message += `<b>Замовник:</b> ${data.name.trim()}\n`;
    message += `<b>Номер телефону:</b> ${data.phone.split(' ').join('')}`;

    axios
      .post(URL, {
        chat_id: process.env.REACT_APP_CHAT_ID,
        parse_mode: 'html',
        text: message,
      })
      .then(() =>
        setRequestDone({
          isOpen: true,
          title: 'Заявка відправлена!',
          text: `Наш менеджер незабором з вами зв'яжеться.`,
        }),
      )
      .catch((error) =>
        setRequestDone({
          isOpen: true,
          title: 'Виникла помилка! ⚠',
          text: 'При роботі серверу виникла помилка: ' + error.message + '. Спробуйте пізніше...',
        }),
      )
      .finally(() => {
        setIsOpenCallback(false);
        reset();
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.popup}
      onClick={() => setIsOpenCallback(false)}>
      <div className={styles.body}>
        <motion.div
          className={styles.content}
          onClick={(e) => e.stopPropagation()}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit">
          <div onClick={() => setIsOpenCallback(false)} className="_icon-close"></div>
          <h2 className={styles.title}>Передзвонити вам?</h2>
          <p className={styles.text}>
            Вкажіть номер телефону та ім'я. Ми зв'яжемося з вами у найближчий час.
          </p>
          <form className={styles.form} onSubmit={handleSubmit(onSubmitCallback)}>
            <label htmlFor="name">
              <span>Ім'я</span>
              <input
                placeholder="Віше Ім'я"
                type="text"
                {...register('name', {
                  required: `Заповніть поле!`,
                  minLength: { value: 3, message: `Введіть ім'я менше 3-х літер!` },
                  pattern: {
                    value: /^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁёІі]+$/,
                    message: `Ім'я може складатись тільки з літер!`,
                  },
                })}
              />
              {errors?.name && <p>{errors?.name?.message}</p>}
            </label>

            <label htmlFor="phone">
              <span>Телефон</span>
              <input
                placeholder="0661416662"
                type="phone"
                {...register('phone', {
                  required: `Заповніть поле!`,
                  pattern: {
                    value: /^\+?[380]?\d{10}/g,
                    message: `Невірний формат номеру телефона!`,
                  },
                })}
              />
              {errors?.phone && <p>{errors?.phone?.message}</p>}
            </label>

            <button className={styles.input__btn} type="submit">
              <span>Відправити</span>
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Callback;
