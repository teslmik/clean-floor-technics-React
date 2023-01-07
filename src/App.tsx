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
        <Route path="catalog" element={<Suspense fallback={<CircleLoader />}><Catalog /></Suspense>} />
        <Route path="about" element={<Suspense fallback={<CircleLoader />}><About /></Suspense>} />
        <Route path="pay_and_delivery" element={<Suspense fallback={<CircleLoader />}><PayAndDelivery /></Suspense>} />
        <Route path="return" element={<Suspense fallback={<CircleLoader />}><Return /></Suspense>} />
        <Route path="contacts" element={<Suspense fallback={<CircleLoader />}><Contacts /></Suspense>} />
        <Route path="cart" element={<Suspense fallback={<CircleLoader />}><Cart /></Suspense>} />
        <Route path="blog" element={<Suspense fallback={<CircleLoader />}><Blog /></Suspense>} />
        <Route path="services" element={<Suspense fallback={<CircleLoader />}><Services /></Suspense>} />
        <Route path="products/:category/:_id" element={<Suspense fallback={<CircleLoader/>}><FullItem /></Suspense>} />
        <Route path="blog/:id" element={<Suspense fallback={<CircleLoader />}><FullBlogItem /></Suspense>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;