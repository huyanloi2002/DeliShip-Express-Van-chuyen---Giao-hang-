import { TYPES } from "../actions/actionTypes";

const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.AUTH:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
