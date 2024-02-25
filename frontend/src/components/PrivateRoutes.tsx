import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTER_KEYS } from "../constants/app-keys";
import { userSelector } from "../redux/user/selectors";

export const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { user } = useSelector(userSelector);

  return user ? children : <Navigate to={`/${ROUTER_KEYS.AUTH}`} replace />;
};
