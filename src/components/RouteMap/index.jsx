import React from 'react';
import { motion } from 'framer-motion';

import { AppContext } from '../../App';
import styles from './RouteMap.module.scss';

const RouteMap = () => {
  const { setIsOpenMap } = React.useContext(AppContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.popup}
      onClick={() => setIsOpenMap(false)}>
      <div className={styles.body}>
        <motion.div className={styles.content} onClick={(e) => e.stopPropagation()}>
          <div onClick={() => setIsOpenMap(false)} className="_icon-close"></div>
          <h2 className={styles.title}>Розташування магазину в м. Одеса</h2>
          <div className={styles.mapResponsive}>
            <iframe
              title="Rout map to store"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d76146.40358453275!2d30.67880170764194!3d46.44377216920573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x31c1a26f6c14b640!2z0JTQuNGB0YLRgNC40LEn0Y7RgtC-0YAgVHJ1dm94INCyINCj0LrRgNCw0ZfQvdGW!5e0!3m2!1suk!2sua!4v1671447885911!5m2!1suk!2sua"
              width={600}
              height={450}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RouteMap;
