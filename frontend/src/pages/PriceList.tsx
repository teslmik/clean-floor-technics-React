import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { Button } from "@mui/material";
import "@react-pdf-viewer/core/lib/styles/index.css";

import priceList from "/assets/docs/PriceListTruvox_2024.pdf";

export const PriceList: React.FC = () => {
  const isMobileOrSafari = () => {
    const userAgent = navigator.userAgent;
    return (
      /iPhone|iPad|iPod|Android/i.test(userAgent) ||
      (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
    );
  };

  return (
    <div className="priceList">
      {isMobileOrSafari() ? (
        <>
          <Button
            href={priceList}
            download="PriceListTruvox_2024.pdf"
            variant="contained"
            sx={{
              position: "sticky",
              top: 0,
              left: "100%",
              transform: "translate(-30px, 60px)",
              zIndex: 100,
            }}
          >
            Скачать прайс-лист
          </Button>
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
          >
            <Viewer enableSmoothScroll fileUrl={priceList} />
          </Worker>
        </>
      ) : (
        <iframe src={priceList} width="100%" height="750px" title="priseList" />
      )}
    </div>
  );
};
