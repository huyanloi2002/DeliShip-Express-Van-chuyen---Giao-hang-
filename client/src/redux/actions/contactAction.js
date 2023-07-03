import { TYPES } from "./actionTypes";
import { postDataAPI, getDataAPI } from "../../utils/fetchData";

export const sendContact =
  ({ data, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: TYPES.ALERT, payload: { loading: true } });
      const res = await postDataAPI("send_contact", data, auth.token);
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

export const getAllContact = () => async (dispatch) => {
  try {
    dispatch({ type: TYPES.ALERT, payload: { loading: true } });
    const res = await getDataAPI("all_contact");
    dispatch({
      type: TYPES.CONTACT,
      payload: res.data.contact,
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
