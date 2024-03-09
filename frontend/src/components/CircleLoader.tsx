import React from "react";
import { TailSpin } from "react-loader-spinner";

export const CircleLoader: React.FC = () => {
  return (
    // <div className="loader__warapper">
    //   <div className="loader">Loading...</div>
    // </div>
    <TailSpin
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass="loader__warapper"
    />
  );
};
