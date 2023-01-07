import React, { Suspense } from "react";
import { Routes, Route } from 'react-router-dom';

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CircleLoader from "./components/CircleLoader";

import './scss/app.scss';

const FullItem = React.lazy(() => import(/* webpackChunkName: "FullItem" */'./pages/FullItem'));
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */'./pages/Cart'));
const Blog = React.lazy(() => import(/* webpackChunkName: "Blog" */'./pages/Blog'));
const Catalog = React.lazy(() => import(/* webpackChunkName: "Catalog" */'./pages/Catalog'));
const FullBlogItem = React.lazy(() => import(/* webpackChunkName: "FullBlogItem" */'./pages/FullBlogItem'));
const Return = React.lazy(() => import(/* webpackChunkName: "Return" */'./pages/Return'));
const Contacts = React.lazy(() => import(/* webpackChunkName: "Contacts" */'./pages/Contacts'));
const About = React.lazy(() => import(/* webpackChunkName: "About" */'./pages/About'));
const PayAndDelivery = React.lazy(() => import(/* webpackChunkName: "PayAndDelivery" */'./pages/PayAndDelivery'));
const Services = React.lazy(() => import(/* webpackChunkName: "Services" */'./pages/Services'));

const App: React.FC = () => {
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
        <Route path="services" element={<Services />} />
        <Route path="products/:category/:_id" element={<FullItem />} />
        <Route path="blog/:id" element={<FullBlogItem />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;