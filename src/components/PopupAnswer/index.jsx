import React from 'react';
import { motion } from 'framer-motion';

import { AppContext } from '../../App';
import { dropIn } from '../../js/modules/functions';

import styles from './PopupAnswer.module.scss';

const PopupAnswer = ({ title, text }) => {
  const { setRequestDone } = React.useContext(AppContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.popup}
      onClick={() => setRequestDone({ isOpen: false })}>
      <div className={styles.body}>
        <motion.div
          className={styles.content}
          onClick={(e) => e.stopPropagation()}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit">
          <div onClick={() => setRequestDone({ isOpen: false })} className="_icon-close"></div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.text}>{text}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PopupAnswer;
