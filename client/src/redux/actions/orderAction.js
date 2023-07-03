import { TYPES } from "./actionTypes";
import {
  postDataAPI,
  getDataAPI,
  putDataAPI,
  deleteDataAPI,
  patchDataAPI,
} from "../../utils/fetchData";
import {
  createNotify,
  removeNotify,
  getNotifies,
} from "../actions/notifyAction";

export const createOrder =
  ({ data, auth, socket }) =>
  async (dispatch) => {
    try {
      dispatch({ type: TYPES.ALERT, payload: { loading: true } });
      const res = await postDataAPI("create_order", data, auth.token);
      dispatch({
        type: TYPES.ORDER,
        payload: res.data.savedOrder,
      });

      dispatch({
        type: TYPES.ALERT,
        payload: {
          success: res.data.msg,
          check: res.data.success,
        },
      });

      const msg = {
        id: res.data.savedOrder._id,
        text: "add_new_order",
        recipients: ["64937297320026c274ed5ce9"],
        url: `/get_order/${res.data.savedOrder._id}`,
        content: `${res.data.savedOrder.nameTrans}: ${res.data.savedOrder.nameParcel}`,
      };

      dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
export const paymentCreditCard =
  ({ data, auth, socket }) =>
  async (dispatch) => {
    try {
      dispatch({ type: TYPES.ALERT, payload: { loading: true } });
      const res = await postDataAPI("paymentCreditcard", data, auth.token);
      dispatch({
        type: TYPES.ORDER,
        payload: res.data.savedOrder,
      });

      dispatch({
        type: TYPES.ALERT,
        payload: {
          success: res.data.msg,
          check: res.data.success,
        },
      });
      const msg = {
        id: res.data.savedOrder._id,
        text: "add_new_order",
        recipients: ["64937297320026c274ed5ce9"],
        url: `/get_order/${res.data.savedOrder._id}`,
        content: `${res.data.savedOrder.nameTrans}: ${res.data.savedOrder.nameParcel}`,
      };

      dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
export const getOrderByUser = (userId, token) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.ALERT, payload: { loading: true } });
    const res = await getDataAPI(`get_orders_by_user/id=${userId}`, token);
    dispatch({
      type: TYPES.ORDER_BY_USER,
      payload: res.data,
    });

    dispatch({
      type: TYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (err) {
    dispatch({
      type: TYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
export const getOrderById =
  ({ idParcel, token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: TYPES.ALERT, payload: { loading: true } });
      const res = await getDataAPI(`get_order/${idParcel}`, token);
      dispatch({
        type: TYPES.ORDER_BY_ID,
        payload: res.data,
      });

      dispatch({
        type: TYPES.ALERT,
        payload: {
          success: res.data.msg,
        },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
export const getAllOrders =
  ({ token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: TYPES.ALERT, payload: { loading: true } });
      const res = await getDataAPI("get_orders", token);
      dispatch({
        type: TYPES.ORDERS,
        payload: res.data,
      });

      dispatch({
        type: TYPES.ALERT,
        payload: {
          success: res.data.msg,
        },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

export const getAllOrdersUnconfirmed =
  ({ token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: TYPES.ALERT, payload: { loading: true } });
      const res = await getDataAPI("get_orders_unconfirmed", token);
      dispatch({
        type: TYPES.ORDERS_UNCONFIRMED,
        payload: res.data,
      });

      dispatch({
        type: TYPES.ALERT,
        payload: {
          success: res.data.msg,
        },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
export const getAllOrdersConfirmed =
  ({ token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: TYPES.ALERT, payload: { loading: true } });
      const res = await getDataAPI("get_orders_confirmed", token);
      dispatch({
        type: TYPES.ORDERS_CONFIRMED,
        payload: res.data,
      });

      dispatch({
        type: TYPES.ALERT,
        payload: {
          success: res.data.msg,
        },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
export const getAllOrdersDelivering =
  ({ token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: TYPES.ALERT, payload: { loading: true } });
      const res = await getDataAPI("get_orders_delivering", token);
      dispatch({
        type: TYPES.ORDERS_DELIVERING,
        payload: res.data,
      });
      dispatch({
        type: TYPES.ALERT,
        payload: {
          success: res.data.msg,
        },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
export const getAllOrdersDelivered =
  ({ token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: TYPES.ALERT, payload: { loading: true } });
      const res = await getDataAPI("get_orders_delivered", token);
      dispatch({
        type: TYPES.ORDERS_DELIVERED,
        payload: res.data,
      });
      dispatch({
        type: TYPES.ALERT,
        payload: {
          success: res.data.msg,
        },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
export const getAllOrdersUnpaid =
  ({ token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: TYPES.ALERT, payload: { loading: true } });
      const res = await getDataAPI("get_orders_unpaid", token);
      dispatch({
        type: TYPES.ORDERS_UNPAID,
        payload: res.data,
      });
      dispatch({
        type: TYPES.ALERT,
        payload: {
          success: res.data.msg,
        },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
export const getAllOrdersPaid =
  ({ token }) =>
  async (dispatch) => {
    try {
      dispatch({ type: TYPES.ALERT, payload: { loading: true } });
      const res = await getDataAPI("get_orders_paid", token);
      dispatch({
        type: TYPES.ORDERS_PAID,
        payload: res.data,
      });
      dispatch({
        type: TYPES.ALERT,
        payload: {
          success: res.data.msg,
        },
      });
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
export const updateOrder =
  ({ order, dataUpdate = { status: "", checkPay: "" }, auth, socket }) =>
  async (dispatch) => {
    console.log({ order, dataUpdate, auth, socket });
    try {
      dispatch({ type: TYPES.ALERT, payload: { loading: true } });
      const res = await putDataAPI(
        `update_order/${order._id}`,
        dataUpdate,
        auth.token,
        "application/json"
      );

      // dispatch({
      //   type: TYPES.UPDATE_ORDER,
      //   payload: res.data.updatedOrder,
      // });

      const msg = {
        id: order._id,
        text: `${dataUpdate.status ? dataUpdate.status : dataUpdate.checkPay}`,
        recipients: [`${order.userId}`],
        url: `/get_order/${order._id}`,
        content: `${order.nameTrans}: ${order.nameParcel}`,
      };

      socket.emit("updateStatus", {
        ...res.data.updatedOrder,
        status: dataUpdate.status,
      });

      dispatch(createNotify({ msg, auth, socket }));

      if (dataUpdate.status === "preparing") {
        dispatch(getAllOrdersConfirmed({ token: auth.token }));
      }
      if (dataUpdate.status === "confirmed") {
        dispatch(getAllOrdersUnconfirmed({ token: auth.token }));
      }
      if (
        dataUpdate.status === "pickup complete" ||
        dataUpdate.status === "in transit" ||
        dataUpdate.status === "delivered"
      ) {
        dispatch(getAllOrdersDelivering({ token: auth.token }));
      }
      if (dataUpdate.checkPay === "paid") {
        dispatch(getAllOrdersUnpaid({ token: auth.token }));
      }
      dispatch({
        type: TYPES.ALERT,
        payload: res.data.msg,
      });
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
export const deleteOrder =
  ({ order, auth, socket }) =>
  async (dispatch) => {
    dispatch({ type: TYPES.UPDATE_ORDER, payload: order });
    try {
      const res = await deleteDataAPI(`delete_order/${order._id}`, auth.token);
      const msg = {
        id: order._id,
        recipients: [`${order.userId}`, `${auth.userId}`],
        url: `/get_order/${order._id}`,
      };
      dispatch(removeNotify({ msg, auth, socket }));
      dispatch(getNotifies({ msg, token: auth.token, socket }));
      dispatch(getAllOrders({ token: auth.token }));
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
export const updateReviews =
  ({ dataOrderId, data, auth }) =>
  async (dispatch) => {
    console.log(dataOrderId);
    try {
      await patchDataAPI(`update_reviews/${dataOrderId._id}`, data, auth.token);
      dispatch(
        getOrderByUser({ userId: dataOrderId.userId, token: auth.token })
      );
      window.location.reload("/parcels");
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
