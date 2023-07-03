import React, { lazy, Suspense } from "react";
import Sidebar from "../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import "../styles/Admin.scss";

const Dashboard = lazy(() => import("../admin/Dashboard"));
const Orders = lazy(() => import("../admin/Orders"));
const OrdersUncomfirmed = lazy(() => import("../admin/OrdersUncomfirmed"));
const OrdersComfirmed = lazy(() => import("../admin/OrdersComfirmed"));
const OrdersDelivering = lazy(() => import("../admin/OrdersDelivering"));
const OrdersDelivered = lazy(() => import("../admin/OrdersDelivered"));
const OrdersUnpaid = lazy(() => import("../admin/OrdersUnpaid"));
const OrdersPaid = lazy(() => import("../admin/OrdersPaid"));
const OrderDetails = lazy(() => import("../pages/OrderDetails"));
const AllContact = lazy(() => import("../admin/AllContact"));
const AllReviews = lazy(() => import("../admin/AllReviews"));
const AllUser = lazy(() => import("../admin/AllUser"));

const Loading = lazy(() => import("../components/Loading"));

const Admin = () => {
  return (
    <>
      <div className="sidebar bg-ligth ">
        <Suspense fallback={<Loading />}>
          <div className="row flex-nowrap ">
            <Sidebar />
            <div className="col px-2 py-2 overflow-hidden">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="orders" element={<Orders />} />
                <Route
                  path="orders_unconfirmed"
                  element={<OrdersUncomfirmed />}
                />
                <Route path="orders_confirmed" element={<OrdersComfirmed />} />{" "}
                <Route
                  path="orders_delivering"
                  element={<OrdersDelivering />}
                />
                <Route path="orders_delivered" element={<OrdersDelivered />} />
                <Route path="orders_unpaid" element={<OrdersUnpaid />} />
                <Route path="orders_paid" element={<OrdersPaid />} />
                <Route path="order_details/:id" element={<OrderDetails />} />
                <Route path="all_user" element={<AllUser />} />
                <Route path="all_contact" element={<AllContact />} />
                <Route path="all_reviews" element={<AllReviews />} />
              </Routes>
            </div>
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default Admin;
