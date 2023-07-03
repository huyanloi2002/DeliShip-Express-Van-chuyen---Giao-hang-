import { TYPES } from "./actionTypes";
import {
  postDataAPI,
  getDataAPI,
  deleteDataAPI,
  patchDataAPI,
} from "../../utils/fetchData";

export const createNotify =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    try {
      // dispatch({ type: TYPES.ALERT, payload: { loading: true } });
      const res = await postDataAPI("create_notify", msg, auth.token);
      socket.emit("createNotify", {
        ...res.data.notify,
        user: {
          email: auth.user.email,
          avatar: auth.user.avatar,
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

export const getNotifies =
  ({ token }) =>
  async (dispatch) => {
    try {
      // dispatch({ type: TYPES.ALERT, payload: { loading: true } });
      const res = await getDataAPI("get_notifies", token);
      dispatch({ type: TYPES.GET_NOTIFIES, payload: res.data });
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
export const removeNotify =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    try {
      await deleteDataAPI(
        `delete_notifies/${msg.id}?url=${msg.url}`,
        auth.token
      );

      socket.emit("removeNotify", msg);
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };

export const isReadNotify =
  ({ msg, auth }) =>
  async (dispatch) => {
    dispatch({
      type: TYPES.UPDATE_NOTIFIES,
      payload: { ...msg, isRead: true },
    });
    try {
      await patchDataAPI(`is_read_notify/${msg._id}`, null, auth.token);
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
