import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Callback from '../components/Callback';
import CartPopup from '../components/CartPopup';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RouteMap from '../components/RouteMap';
import PopupAnswer from '../components/PopupAnswer';
import { useAppDispatch } from '../redux/store';
import { filterSelector, setFilter } from '../redux/slices/filterSlice';
import { MyGlobalContext } from '../hook/useGlobalContext';
import { ibg } from '../utils/ibg';
import { isWebp } from '../utils/isWebp';
import { bodyLock, bodyUnlock } from '../utils/bodyLockUnlock';

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filterState } = useSelector(filterSelector);
  const [isWebpImg, setIsWebpImg] = React.useState<boolean>(false);
  const [isOpenCallback, setIsOpenCallback] = React.useState(false);
  const [isOpenCart, setIsOpenCart] = React.useState(false);
  const [isOpenMap, setIsOpenMap] = React.useState(false);
  const [requestDone, setRequestDone] = React.useState({isOpen: false, title: '', text: ''});
  const [windowWidth, setWindowWidth] = React.useState(window.screen.width);

  const handleTooggle = (value: string) => {
    const currentIndex = filterState.indexOf(value);
    const newChecked = [...filterState];

    currentIndex === -1 ? newChecked.push(value) : newChecked.splice(currentIndex, 1);

    dispatch(setFilter(newChecked));
  };

  React.useEffect(() => {
    isWebp();
    if (document.getElementsByClassName('webp')) {
      setIsWebpImg(true);
    }
  }, []);

  React.useEffect(() => {
    isOpenCallback === true || isOpenCart === true || isOpenMap === true || requestDone.isOpen === true
      ? bodyLock() : bodyUnlock();
    ibg();
  }, [isOpenCallback, isOpenCart, isOpenMap, requestDone]);

  React.useEffect(() => {
    window.onresize = () => {
      setWindowWidth(window.innerWidth);
    };
  }, [windowWidth]);

  return (
    <div className="wrapper">
      <MyGlobalContext.Provider
        value={{
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
      </MyGlobalContext.Provider>
    </div>
  );
};

export default MainLayout;