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
import Return from "./pages/Return";

import './scss/app.scss';
import Contacts from "./pages/Contacts";
import About from "./pages/About";
import PayAndDelivery from "./pages/PayAndDelivery";

export const AppContext = React.createContext();

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} >
        <Route path="" element={<Home />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="about" element={<About />} />
        <Route path="pay_and_delivery" element={<PayAndDelivery />} />
        <Route path="return" element={<Return />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="cart" element={<Cart />} />
        <Route path="blog" element={<Blog />} />
        <Route path="products/:category/:id" element={<FullItem />} />
        <Route path="blog/:id" element={<FullBlogItem />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;