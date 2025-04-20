import { forwardRef } from "react";

import styles from "./ThreeDotsLoader.module.scss";

interface ThreeDotsLoaderProps {
  loading: boolean;
}

export const ThreeDotsLoader = forwardRef<HTMLDivElement, ThreeDotsLoaderProps>(
  ({ loading }, ref) => {
    return (
      <div
        ref={ref}
        className={styles.wrapper}
        style={loading ? { height: "40px" } : undefined}
      >
        {loading && (
          <>
            <div className={styles.loader}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </div>
            <p>Loading more...</p>
          </>
        )}
      </div>
    );
  },
);

ThreeDotsLoader.displayName = "ThreeDotsLoader";
