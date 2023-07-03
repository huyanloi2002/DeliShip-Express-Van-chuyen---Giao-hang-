import { TYPES } from "./actionTypes";
import { postDataAPI, putDataAPI } from "../../utils/fetchData";
import valid from "../../utils/valid";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI("login", data);

    dispatch({
      type: TYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
        verified: res.data.user.verified,
        userId: res.data.user._id,
        fullname: res.data.user.fullname,
        username: res.data.user.username,
        email: res.data.user.email,
        phone: res.data.user.phone,
        address: res.data.user.address,
        identityCard: res.data.user.identityCard,
        avatar: res.data.user.avatar.url,
        role: res.data.user.role,
        createdAt: res.data.user.createdAt,
      },
    });
    localStorage.setItem("firstLogin", true);
    if (res.data.user.verified === true) {
      localStorage.setItem("verified", true);
    }
    if (res.data.user.role === "admin") {
      localStorage.setItem("admin", true);
    }
    if (res.data.user.role === "sender") {
      localStorage.setItem("sender", true);
    }
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
        type: err.response.data.type,
      },
    });
  }
};
export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("firstLogin");

  if (firstLogin) {
    dispatch({ type: TYPES.ALERT, payload: { loading: true } });
    try {
      const res = await postDataAPI("refresh_token", {
        withCredentials: true,
        credentials: "include",
      });
      dispatch({
        type: TYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
          verified: res.data.user.verified,
          userId: res.data.user._id,
          username: res.data.user.username,
          email: res.data.user.email,
          avatar: res.data.user.avatar.url,
          role: res.data.user.role,
          createdAt: res.data.user.createdAt,
          phone: res.data.user.phone,
          address: res.data.user.address,
          identityCard: res.data.user.identityCard,
          fullname: res.data.user.fullname,
        },
      });
      dispatch({ type: TYPES.ALERT, payload: {} });
    } catch (err) {
      dispatch({
        type: TYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  }
};
export const register = (data) => async (dispatch) => {
  const check = valid(data);
  if (check.errLength > 0) {
    return dispatch({
      type: TYPES.ALERT,
      payload: {
        errMsgEmail: check.errMsg.email,
        errTypeEmail: check.errType.email,
        errMsgUsername: check.errMsg.username,
        errTypeUsername: check.errType.username,
        errMsgFullname: check.errMsg.fullname,
        errTypeFullname: check.errType.fullname,
        errMsgPassword: check.errMsg.password,
        errTypePassword: check.errType.password,
        errMsgCfpassword: check.errMsg.cf_password,
        errTypeCfpassword: check.errType.cf_password,
      },
    });
  }
  try {
    dispatch({ type: TYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI("register", data);
    dispatch({
      type: TYPES.AUTH,
      payload: {
        userId: res.data.user.userId,
        email: res.data.user.email,
        token: res.data.user.token,
        username: res.data.user.username,
        fullname: res.data.user.fullname,
      },
    });
    localStorage.setItem("firstLogin", true);
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
        type: err.response.data.type,
      },
    });
  }
};
export const verifyOTPRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI("verify_otp_register", data);
    console.log(res);
    dispatch({
      type: TYPES.AUTH,
      payload: {
        token: res.data.token,
        verified: res.data.user.verified,
        userId: res.data.user.userId,
        email: res.data.user.email,
        token: res.data.user.token,
        username: res.data.user.username,
        avatar: res.data.user.avatar.url,
        role: res.data.user.role,
        createdAt: res.data.user.createdAt,
        phone: res.data.user.phone,
        address: res.data.user.address,
        identityCard: res.data.user.identityCard,
        fullname: res.data.user.fullname,
      },
    });
    localStorage.setItem("verified", true);
    if (res.data.user.role === "admin") {
      localStorage.setItem("admin", true);
    }
    if (res.data.user.role === "sender") {
      localStorage.setItem("sender", true);
    }
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
        type: err.response.data.type,
      },
    });
  }
};
export const resendOTPRegister = (data) => async (dispatch) => {
  try {
    dispatch({ type: TYPES.ALERT, payload: { loading: true } });
    const res = await postDataAPI("resend_otp_register", data);
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
export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("firstLogin");
    localStorage.removeItem("verified");
    localStorage.removeItem("admin");
    localStorage.removeItem("sender");
    await postDataAPI("logout");
    window.location.reload();
  } catch (err) {
    dispatch({
      type: TYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
