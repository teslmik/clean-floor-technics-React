import React from "react";
import { Navigate } from "react-router-dom";
import { ROUTER_KEYS, STORAGE_KEYS } from "../constants/app-keys";

export const PublicRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const isAuthenticated = localStorage.getItem(STORAGE_KEYS.TOKEN) !== null;

  return isAuthenticated ? (
    <Navigate to={ROUTER_KEYS.ROOT} replace />
  ) : (
    children
  );
};
