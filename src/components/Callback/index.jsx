import React from 'react';
import { motion } from 'framer-motion';

import { dropIn } from '../../js/modules/functions';
import { AppContext } from '../../App';

import styles from './Callback.module.scss';

const Callback = () => {
  const { setIsOpenCallback } = React.useContext(AppContext);

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
          <form action="" className={styles.form}>
            <label htmlFor="name">
              <span>Ім'я</span>
              <input type="text" id="name" />
            </label>
            <label htmlFor="phone">
              <span>Телефон</span>
              <input type="phone" id="phone" />
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
