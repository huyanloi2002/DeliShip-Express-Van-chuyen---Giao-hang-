import React, { lazy, useEffect, startTransition } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.scss";

import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import { getNotifies } from "./redux/actions/notifyAction";

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

const NotFound = lazy(() => import("./components/NotFound"));
const Loading = lazy(() => import("./components/Loading"));
const Navbar = lazy(() => import("./components/Navbar"));

const Contact = lazy(() => import("./pages/Contact"));
const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const CreateOrder = lazy(() => import("./pages/CreateOrder"));
const Parcels = lazy(() => import("./pages/Parcels"));
const Profile = lazy(() => import("./pages/Profile"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const ProhibitedGoods = lazy(() => import("./pages/ProhibitedGoods"));
const Policy = lazy(() => import("./pages/Policy"));

const Admin = lazy(() => import("./pages/Admin"));

const SocketClient = lazy(() => import("./SocketClient"));

import io from "socket.io-client";
import { TYPES } from "./redux/actions/actionTypes";

function App() {
  const dispatch = useDispatch();
  const { auth, alert } = useSelector((state) => state);

  useEffect(() => {
    startTransition(() => {
      dispatch(refreshToken());
    });
  }, [dispatch]);

  useEffect(() => {
    const socket = io();
    dispatch({ type: TYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      startTransition(() => {
        dispatch(getNotifies({ token: auth.token }));
      });
    }
  }, [dispatch, auth.token]);

  const firstLogin = localStorage.getItem("firstLogin");
  const verified = localStorage.getItem("verified");
  return (
    <React.Fragment>
      <BrowserRouter>
        {alert.loading && <Loading />}
        <React.Suspense fallback={<Loading />}>
          {auth.verified && <Navbar />}
          {auth.token && <SocketClient />}
          <Routes>
            {/* Route kiểm tra liên kết giữa đăng nhập, đăng ký và xác thực thông tin*/}
            {!verified && firstLogin && (
              <Route
                path="/"
                element={<Navigate to="/verify_email" replace />}
              />
            )}
            {firstLogin && <Route path="/" element={<Home />} />}
            {!firstLogin && (
              <Route path="/" element={<Navigate to="/login" replace />} />
            )}
            {!verified && firstLogin && (
              <Route
                path="/register"
                element={<Navigate to="/verify_email" replace />}
              />
            )}
            {!verified && firstLogin && (
              <Route
                path="/login"
                element={<Navigate to="/verify_email" replace />}
              />
            )}
            <Route
              path="/login"
              element={firstLogin ? <Navigate to="/" replace /> : <Login />}
            />
            <Route
              path="/register"
              element={
                firstLogin && verified ? (
                  <Navigate to="/" replace />
                ) : (
                  <Register />
                )
              }
            />
            <Route
              path="/verify_email"
              element={
                firstLogin && !verified ? (
                  <VerifyEmail />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            {/* Route thông thương*/}
            <Route path="*" element={<NotFound />} />

            <Route
              path="/create_order"
              element={PrivateRoute(<CreateOrder />)}
            />

            <Route path="/parcels" element={PrivateRoute(<Parcels />)} />
            <Route path="/profile" element={PrivateRoute(<Profile />)} />
            <Route
              path="/order_details/:id"
              element={PrivateRoute(<OrderDetails />)}
            />
            <Route path="/contact" element={PrivateRoute(<Contact />)} />
            <Route path="/policy" element={PrivateRoute(<Policy />)} />
            <Route
              path="/prohibited_goods"
              element={PrivateRoute(<ProhibitedGoods />)}
            />

            {/*Admin*/}
            <Route path="/admin/*" element={AdminRoute(<Admin />)} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
