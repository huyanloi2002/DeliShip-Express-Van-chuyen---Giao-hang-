import React from "react";
import { Navigate } from "react-router-dom";

const render = (c) => {
  return c;
};

const PrivateRoute = (Component) => {
  const firstLogin = localStorage.getItem("firstLogin");
  const verified = localStorage.getItem("verified");

  return firstLogin && verified ? render(Component) : <Navigate to="/" />;
};

export default PrivateRoute;
