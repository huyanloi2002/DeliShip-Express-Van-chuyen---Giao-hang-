import React, { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../redux/actions/orderAction";
import { updateOrder } from "../redux/actions/orderAction";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/OrderDetails.scss";
import Loading from "../components/Loading";

const ParcelDetailsBox = lazy(() => import("../components/ParcelDetailsBox"));
const InvoiceOrder = lazy(() => import("../components/InvoiceOrder"));

const OrderDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, orderById, socket, alert } = useSelector((state) => state);

  const idParcel = params.id;

  useEffect(() => {
    if (auth.token) {
      dispatch(getOrderById({ idParcel: idParcel, token: auth.token }));
    }
  }, [dispatch, idParcel, auth.token]);

  const handleConfirmedOrder = (e) => {
    const { value } = e.target;
    dispatch(
      updateOrder({
        order: orderById.dataOrderId,
        dataUpdate: { status: value },
        auth: auth,
        socket: socket,
      })
    );
    if (!alert.loading) {
      navigate("/admin/orders");
    }
  };
  return (
    <div className="order_details">
      <div className="order_details_content">
        <div className="title_order_details">
          <h3 className="text-uppercase fw-bold py-1">
            Chi tiết đơn hàng
            <span className="text-uppercase px-2">
              {idParcel ? `(DEL-${idParcel.slice(-8)})` : ""}
            </span>
          </h3>
        </div>
        <div className="row">
          <div className="content_left_details col-lg-6">
            <Suspense fallback={<Loading />}>
              <InvoiceOrder orderById={orderById.dataOrderId} />
            </Suspense>
          </div>
          <div className="content_right_details col-lg-6">
            <Suspense fallback={<Loading />}>
              <ParcelDetailsBox orderById={orderById.dataOrderId} />
            </Suspense>
          </div>
          {auth.role === "admin" &&
          orderById.dataOrderId.status === "unconfirmed" ? (
            <div className="update_order_details">
              <button
                value="confirmed"
                onClick={(e) => handleConfirmedOrder(e)}
                className="btn_confirm"
              >
                Xác nhận đơn hàng
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
