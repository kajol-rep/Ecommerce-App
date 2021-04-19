import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/authProvider";
export function PrivateRoute({ path, ...props }) {
  const { login } = useAuth();
  console.log({ path });
  return login ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}
