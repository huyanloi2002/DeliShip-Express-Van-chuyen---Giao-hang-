import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReduder";
import { orderByUser, orderById } from "./orderReducer";
import { userReducer, allUserReducer } from "./userReducer";
import admin from "./adminReducer";
import socket from "./socketReducer";
import notify from "./notifyReducer";
import { contactReducer } from "./contactReducer";

export default combineReducers({
  admin,
  auth,
  alert,
  orderByUser,
  orderById,
  user: userReducer,
  allUsers: allUserReducer,
  socket,
  notify,
  allContact: contactReducer,
});
