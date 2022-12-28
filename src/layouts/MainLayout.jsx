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
import { bodyLock, bodyUnlock, ibg, isWebp } from '../js/modules/functions';
import RouteMap from '../components/RouteMap';
import PopupAnswer from '../components/PopupAnswer';

const MainLayout = () => {
  const dispatch = useDispatch();
  const { filterState } = useSelector(filterSelector);
  const [isWebpImg, setIsWebpImg] = React.useState(false);
  const [isOpenCallback, setIsOpenCallback] = React.useState(false);
  const [isOpenCart, setIsOpenCart] = React.useState(false);
  const [isOpenMap, setIsOpenMap] = React.useState(false);
  const [requestDone, setRequestDone] = React.useState({
    isOpen: false,
    title: '',
    text: '',
  });
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
    isWebp();
    if (document.getElementsByClassName('webp')) {
      setIsWebpImg(true);
      console.log('isWebpImg: ', isWebpImg);
    }
  }, []);

  React.useEffect(() => {
    isOpenCallback === true ||
    isOpenCart === true ||
    isOpenMap === true ||
    requestDone.isOpen === true
      ? (document.body.style.overflowY = 'hidden' && bodyLock())
      : (document.body.style.overflowY = 'visible' && bodyUnlock());
    ibg();
  }, [isOpenCallback, isOpenCart, isOpenMap, requestDone]);

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
          isOpenMap,
          setIsOpenMap,
          requestDone,
          setRequestDone,
          isWebpImg,
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
          {requestDone.isOpen && <PopupAnswer title={requestDone.title} text={requestDone.text} />}
        </AnimatePresence>
      </AppContext.Provider>
    </div>
  );
};

export default MainLayout;
