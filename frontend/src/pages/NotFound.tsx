import React from "react";

import { NotFoundBlock } from "../components";

const NotFound: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        margin: "0 auto",
        width: "100%",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <NotFoundBlock />
    </div>
  );
};

export default NotFound;
