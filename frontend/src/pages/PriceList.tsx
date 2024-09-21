import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import priceList from "/assets/docs/PriceListTruvox_2024.pdf";

export const PriceList: React.FC = () => {
  const isIOS = () => {
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    );
  };

  return (
    <div className="priceList">
      {isIOS() ? (
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
        >
          <Viewer fileUrl={priceList} />
        </Worker>
      ) : (
        <iframe src={priceList} width="100%" height="750px" title="priseList" />
      )}
    </div>
  );
};
