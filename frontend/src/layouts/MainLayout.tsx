import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import {
  Footer,
  Header,
  PopupAnswer,
  Callback,
  CartPopup,
  RouteMap,
} from "../components";
import { useAppDispatch } from "../redux/store";
import { filterSelector } from "../redux/filter/selectors";
import { setFilter } from "../redux/filter/slice";
import { ibg, isWebp, bodyLock, bodyUnlock } from "../utils";
import { MyGlobalContext } from "../hook/useGlobalContext";
import { CallBackImg } from "../components/CallBackImg";
import { fetchRates } from "../redux/rates/asyncActions";
import { fetchPosts } from "../redux/posts/asyncActions";
import { fetchProducts } from "../redux/products/asyncActions";
import { ratesSelector } from "../redux/rates/selectors";

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filterState } = useSelector(filterSelector);
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

  const handleTooggle = (value: string) => {
    const currentIndex = filterState.indexOf(value);
    const newChecked = [...filterState];

    currentIndex === -1
      ? newChecked.push(value)
      : newChecked.splice(currentIndex, 1);

    dispatch(setFilter(newChecked));
  };

  const contextValues = React.useMemo(
    () => ({
      isOpenCart,
      setIsOpenCart,
      isOpenCallback,
      setIsOpenCallback,
      handleTooggle,
      windowWidth,
      isOpenMap,
      setIsOpenMap,
      requestDone,
      setRequestDone,
      isWebpImg,
    }),
    [isOpenCallback, isOpenCart, isOpenMap, isWebpImg, requestDone, windowWidth]
  );

  React.useEffect(() => {
    isWebp();
    if (document.getElementsByClassName("webp")) {
      setIsWebpImg(true);
    }

    dispatch(fetchRates());
    dispatch(fetchPosts());
    dispatch(fetchProducts());
  }, []);

  React.useEffect(() => {
    const rate = localStorage.getItem("currentEuro");

    if (!rate) {
      const euroRate = items.rates.find(
        (rate) => rate.currency === "eu"
      )?.value;
      if (euroRate) localStorage.setItem("currentEuro", euroRate.toString());
    }
  }, [items.rates]);

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
