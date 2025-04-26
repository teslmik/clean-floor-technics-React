import { motion } from "framer-motion";
import React from "react";

import { useGlobalContext } from "@src/hooks/useGlobalContext";
import { dropIn } from "@src/utils";
import styles from "./PopupAnswer.module.scss";

interface IPopupAnswerProps {
  title: string;
  text: string;
}

export const PopupAnswer: React.FC<IPopupAnswerProps> = ({ title, text }) => {
  const { setRequestDone } = useGlobalContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.popup}
      onClick={() => setRequestDone({ isOpen: false, title: "", text: "" })}
    >
      <div className={styles.body}>
        <motion.div
          className={styles.content}
          onClick={(e) => e.stopPropagation()}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            onClick={() =>
              setRequestDone({ isOpen: false, title: "", text: "" })
            }
            className="_icon-close"
          ></div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.text}>{text}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};
