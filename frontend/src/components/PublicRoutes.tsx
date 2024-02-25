import React from "react";
import { Navigate } from "react-router-dom";
import { ROUTER_KEYS } from "../constants/app-keys";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/user/selectors";

export const PublicRoute: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const { user } = useSelector(userSelector);

  return user ? (
    <Navigate to={`/${ROUTER_KEYS.DASHBOARD}`} replace />
  ) : (
    children
  );
};
