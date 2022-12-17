import React from "react";
import { Routes, Route } from 'react-router-dom';

import MainLayout from "./layouts/MainLayout";
import FullItem from './pages/FullItem';
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import FullBlogItem from "./pages/FullBlogItem";
import { ibg } from "./js/modules/functions";

import './scss/app.scss';

export const AppContex = React.createContext();

const App = () => {
  React.useEffect(() => {
    ibg();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />} >
        <Route path="" element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="cart" element={<Cart />} />
        <Route path="blog" element={<Blog />} />
        <Route path="product/:category/:id" element={<FullItem />} />
        <Route path="blog/:id" element={<FullBlogItem />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;