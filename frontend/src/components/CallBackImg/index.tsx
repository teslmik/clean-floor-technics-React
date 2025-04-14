import React from "react";

import styles from "./styles.module.scss";

type Properties = {
  setIsOpenCallback: (state: boolean) => void;
};

export const CallBackImg: React.FC<Properties> = ({ setIsOpenCallback }) => {
  const [scroll, setScroll] = React.useState(0);

  const handleScroll = () => setScroll(window.scrollY);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      style={scroll > 300 ? { transform: "translateY(-40px)" } : {}}
      className={styles.callbackBlock}
      onClick={() => setIsOpenCallback(true)}
      role="button"
      tabIndex={0}
    >
      <img src="/assets/img/icon-message.png" alt="callback-img" width={60} />
      <div className={styles.hoverText}>
        <span>Бажаєте отримати консультацію?</span>
      </div>
    </div>
  );
};
