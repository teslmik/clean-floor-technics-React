import { AnimatePresence } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import {
  Callback,
  CartPopup,
  Footer,
  Header,
  PopupAnswer,
  RouteMap,
} from "../components";
import { CallBackImg } from "../components/CallBackImg";
import { MyGlobalContext } from "../hook/useGlobalContext";
import { fetchNewPosts } from "../redux/posts/asyncActions";
import { fetchProducts } from "../redux/products/asyncActions";
import { fetchRates } from "../redux/rates/asyncActions";
import { ratesSelector } from "../redux/rates/selectors";
import { useAppDispatch } from "../redux/store";
import { bodyLock, bodyUnlock, ibg, isWebp } from "../utils";

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isWebpImg, setIsWebpImg] = React.useState<boolean>(false);
  const [isOpenCallback, setIsOpenCallback] = React.useState(false);
  const [isOpenCart, setIsOpenCart] = React.useState(false);
  const [isOpenMap, setIsOpenMap] = React.useState(false);
  const [requestDone, setRequestDone] = React.useState({
    isOpen: false,
    title: "",
    text: "",
  });
  const [windowWidth, setWindowWidth] = React.useState(window.screen.width);
  const { items } = useSelector(ratesSelector);

  const rate = localStorage.getItem("currentEuro");

  const contextValues = React.useMemo(
    () => ({
      isOpenCart,
      setIsOpenCart,
      isOpenCallback,
      setIsOpenCallback,
      windowWidth,
      isOpenMap,
      setIsOpenMap,
      requestDone,
      setRequestDone,
      isWebpImg,
    }),
    [
      isOpenCallback,
      isOpenCart,
      isOpenMap,
      isWebpImg,
      requestDone,
      windowWidth,
    ],
  );

  React.useEffect(() => {
    isWebp();
    if (document.getElementsByClassName("webp")) {
      setIsWebpImg(true);
    }

    dispatch(fetchRates());
    dispatch(fetchNewPosts());
    dispatch(fetchProducts());
  }, []);

  React.useEffect(() => {
    const euroRate = items.rates.find((rate) => rate.currency === "eu")?.value;

    if (!rate || rate != euroRate) {
      if (euroRate) localStorage.setItem("currentEuro", euroRate.toString());
    }
  }, [items.rates, rate]);

  React.useEffect(() => {
    isOpenCallback === true ||
    isOpenCart === true ||
    isOpenMap === true ||
    requestDone.isOpen === true
      ? bodyLock()
      : bodyUnlock();
    ibg();
  }, [isOpenCallback, isOpenCart, isOpenMap, requestDone]);

  React.useEffect(() => {
    window.onresize = () => {
      setWindowWidth(window.innerWidth);
    };
  }, [windowWidth]);

  return (
    <div className="wrapper">
      <MyGlobalContext.Provider value={contextValues}>
        <Header />
        <main className="main">
          <Outlet />
        </main>
        <Footer />
        <AnimatePresence>
          {isOpenCallback && <Callback />}
          {isOpenCart && <CartPopup />}
          {isOpenMap && <RouteMap />}
          {requestDone.isOpen && (
            <PopupAnswer title={requestDone.title} text={requestDone.text} />
          )}
        </AnimatePresence>
        <CallBackImg setIsOpenCallback={setIsOpenCallback} />
      </MyGlobalContext.Provider>
    </div>
  );
};

export default MainLayout;
