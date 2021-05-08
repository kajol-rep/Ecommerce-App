import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/authProvider";
export function PrivateRoute({ path, ...props }) {
  const { login } = useAuth();
  return login ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}
