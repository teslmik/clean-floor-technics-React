import { PortableTextTypeComponentProps } from "@portabletext/react";
import React from "react";

import { getInstagramPostId } from "@src/utils/getInstagramPostId";
import styles from "./InstagramPost.module.scss";

interface Props extends PortableTextTypeComponentProps<{ url: string }> {
  value: {
    url: string;
  };
}

export const InstagramPost: React.FC<Props> = ({ value }) => {
  const postId = getInstagramPostId(value.url);

  if (!postId) return null;

  return (
    <div className={styles.instagram}>
      <iframe
        src={`https://www.instagram.com/p/${postId}/embed`}
        width="400"
        allow="encrypted-media"
        title="Instagram post"
        style={{ height: "-webkit-fill-available" }}
      />
    </div>
  );
};
