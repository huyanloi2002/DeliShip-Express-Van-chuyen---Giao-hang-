import { TYPES } from "./actionTypes";
import { putDataAPI, getDataAPI } from "../../utils/fetchData";
import { refreshToken } from "../actions/authAction";

export const updateProfile =
  (userId, token, updateData) => async (dispatch) => {
    try {
      dispatch({ type: TYPES.ALERT, payload: { loading: true } });
      const res = await putDataAPI(
        `edit_profile/${userId}`,
        updateData,
        token,
        "multipart/form-data"
      );
      dispatch({
        type: TYPES.USER,
        payload: {
          avatar: res.data.userUpdate.avatar.url,
        },
      });
      dispatch({
        type: TYPES.ALERT,
        payload: {
          success: res.data.msg,
        },
      });
      dispatch(refreshToken());
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  };
export const getAllUser =
  ({ auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: TYPES.ALERT, payload: { loading: true } });
      const res = await getDataAPI("all_user", auth.token);
      console.log(res);
      dispatch({
        type: TYPES.USERS,
        payload: res.data.users,
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
