import React from "react";
import { Navigate } from "react-router-dom";
import { STORAGE_KEYS, ROUTER_KEYS } from "../constants/app-keys";

export const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const isAuthenticated = localStorage.getItem(STORAGE_KEYS.TOKEN) !== null;

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={ROUTER_KEYS.AUTH} replace />
  );
};
