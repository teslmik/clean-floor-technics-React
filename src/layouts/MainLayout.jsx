import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { AppContext } from '../App';
import Callback from '../components/Callback';
import CartPopup from '../components/CartPopup';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { filterSelector, setFilter } from '../redux/slices/filterSlice';
import { fetchProducts } from '../redux/slices/productsSlice';
import { bodyLock, bodyUnlock, ibg } from '../js/modules/functions';
import RouteMap from '../components/RouteMap';

const MainLayout = () => {
  const dispatch = useDispatch();
  const { filterState } = useSelector(filterSelector);
  const [isOpenCallback, setIsOpenCallback] = React.useState(false);
  const [isOpenCart, setIsOpenCart] = React.useState(false);
  const [isOpenMap, setIsOpenMap] = React.useState(false);
  const [isOnCart, setIsOnCart] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.screen.width);

  const getProducts = () => {
    dispatch(fetchProducts());
  };

  const handleTooggle = (value) => {
    const currentIndex = filterState.indexOf(value);
    const newChecked = [...filterState];

    currentIndex === -1 ? newChecked.push(value) : newChecked.splice(currentIndex, 1);

    dispatch(setFilter(newChecked));
  };

  React.useEffect(() => {
    isOpenCallback === true || isOpenCart === true || isOpenMap
      ? (document.body.style.overflowY = 'hidden' && bodyLock())
      : (document.body.style.overflowY = 'visible' && bodyUnlock());
    ibg();
  }, [isOpenCallback, isOpenCart, isOpenMap]);

  React.useEffect(() => {
    window.onresize = () => {
      setWindowWidth(window.innerWidth);
    };
    return () => {
      window.onresize = false;
    };
  }, [windowWidth]);

  return (
    <div className="wrapper">
      <AppContext.Provider
        value={{
          isOpenCart,
          setIsOpenCart,
          isOpenCallback,
          setIsOpenCallback,
          getProducts,
          handleTooggle,
          windowWidth,
          isOnCart,
          setIsOnCart,
          isOpenMap,
          setIsOpenMap,
        }}>
        <Header />
        <main className="main">
          <Outlet />
        </main>
        <Footer />
        <AnimatePresence>
          {isOpenCallback && <Callback />}
          {isOpenCart && <CartPopup />}
          {isOpenMap && <RouteMap />}
        </AnimatePresence>
      </AppContext.Provider>
    </div>
  );
};

export default MainLayout;
