import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { CircleLoader, PrivateRoute, PublicRoute } from "./components";
import { ROUTER_KEYS } from "./constants/app-keys";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/auth";
import Dashboard from "./pages/dashboard";

import "./scss/app.scss";

const FullItem = React.lazy(
  () => import(/* webpackChunkName: "FullItem" */ "./pages/FullItem")
);
const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ "./pages/Cart")
);
const Blog = React.lazy(
  () => import(/* webpackChunkName: "Blog" */ "./pages/Blog")
);
const Catalog = React.lazy(
  () => import(/* webpackChunkName: "Catalog" */ "./pages/Catalog")
);
const FullBlogItem = React.lazy(
  () => import(/* webpackChunkName: "FullBlogItem" */ "./pages/FullBlogItem")
);
const Return = React.lazy(
  () => import(/* webpackChunkName: "Return" */ "./pages/Return")
);
const Contacts = React.lazy(
  () => import(/* webpackChunkName: "Contacts" */ "./pages/Contacts")
);
const About = React.lazy(
  () => import(/* webpackChunkName: "About" */ "./pages/About")
);
const PayAndDelivery = React.lazy(
  () =>
    import(/* webpackChunkName: "PayAndDelivery" */ "./pages/PayAndDelivery")
);
const Services = React.lazy(
  () => import(/* webpackChunkName: "Services" */ "./pages/Services")
);

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path={ROUTER_KEYS.AUTH}
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTER_KEYS.DASHBOARD}
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path={ROUTER_KEYS.ROOT} element={<MainLayout />}>
        <Route path={ROUTER_KEYS.HOME} element={<Home />} />
        <Route
          path={ROUTER_KEYS.CATALOG}
          element={
            <Suspense fallback={<CircleLoader />}>
              <Catalog />
            </Suspense>
          }
        />
        <Route
          path={ROUTER_KEYS.ABOUT}
          element={
            <Suspense fallback={<CircleLoader />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path={ROUTER_KEYS.PAY_AND_DELIVERY}
          element={
            <Suspense fallback={<CircleLoader />}>
              <PayAndDelivery />
            </Suspense>
          }
        />
        <Route
          path={ROUTER_KEYS.RETURN}
          element={
            <Suspense fallback={<CircleLoader />}>
              <Return />
            </Suspense>
          }
        />
        <Route
          path={ROUTER_KEYS.CONTACTS}
          element={
            <Suspense fallback={<CircleLoader />}>
              <Contacts />
            </Suspense>
          }
        />
        <Route
          path={ROUTER_KEYS.CART}
          element={
            <Suspense fallback={<CircleLoader />}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path={ROUTER_KEYS.BLOG}
          element={
            <Suspense fallback={<CircleLoader />}>
              <Blog />
            </Suspense>
          }
        />
        <Route
          path={ROUTER_KEYS.SERVICES}
          element={
            <Suspense fallback={<CircleLoader />}>
              <Services />
            </Suspense>
          }
        />
        <Route
          path={`${ROUTER_KEYS.PRODUCTS}/:category/:_id`}
          element={
            <Suspense fallback={<CircleLoader />}>
              <FullItem />
            </Suspense>
          }
        />
        <Route
          path={`${ROUTER_KEYS.BLOG}/:id`}
          element={
            <Suspense fallback={<CircleLoader />}>
              <FullBlogItem />
            </Suspense>
          }
        />
        <Route path={ROUTER_KEYS.NOT_FOUND} element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
