import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Button } from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import React from "react";

import client from "../../cms/lib/sanitiClient";
import { useGlobalContext } from "../hook/useGlobalContext";

export const PriceList: React.FC = () => {
  const { windowWidth } = useGlobalContext();
  const [priceList, setPriceList] = React.useState<string | null>(null);

  const isMobileOrSafari = () => {
    const userAgent = navigator.userAgent;
    return (
      /iPhone|iPad|iPod|Android/i.test(userAgent) ||
      (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
    );
  };

  const isTablet = windowWidth <= 881.98 && windowWidth > 681.98 ? 70 : 0;
  const isMobile = windowWidth <= 681.98 ? 47 : 0;
  const top = isTablet || isMobile;

  React.useEffect(() => {
    const fetchPriceList = async () => {
      const pdfLink = await client.fetch<{
        url: string;
      }>(`*[_type == "config"][0]{ "url": priceList.asset->url }`);

      if (pdfLink.url) setPriceList(pdfLink.url);
    };

    fetchPriceList();
  }, []);

  if (!priceList) return null;

  return (
    <div className="priceList">
      {isMobileOrSafari() ? (
        <>
          <Button
            href={priceList}
            download="PriceListTruvox.pdf"
            variant="contained"
            size="large"
            startIcon={<CloudDownloadIcon />}
            sx={{
              position: "sticky",
              top,
              left: "100%",
              transform: "translate(-30px, 60px)",
              zIndex: 100,
              textAlign: "center",
              backgroundColor: "#52ad3a",
              ":hover": { backgroundColor: "#6fca4e" },
              "& span": { m: 0 },
            }}
          />
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
