import React from "react";
import styles from "./InstagramPost.module.scss";

interface Props {
  postId: string;
}

export const InstagramPost: React.FC<Props> = ({ postId }) => {
  return (
    <div className={styles.instagram}>
      <iframe
        src={`https://www.instagram.com/p/${postId}/embed`}
        width="400"
        height="645"
        allow="encrypted-media"
        title="Instagram post"
      />
    </div>
  );
};
