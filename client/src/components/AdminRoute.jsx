import React from "react";
import { Navigate } from "react-router-dom";

const render = (c) => {
  return c;
};

const AdminRoute = (Component) => {
  const firstLogin = localStorage.getItem("firstLogin");
  const verified = localStorage.getItem("verified");
  const admin = localStorage.getItem("admin");

  return admin && firstLogin && verified ? (
    render(Component)
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
