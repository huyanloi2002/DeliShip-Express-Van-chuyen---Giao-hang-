import { TYPES } from "../actions/actionTypes";

const initialState = {};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ALERT:
      return action.payload;
    default:
      return state;
  }
};

export default alertReducer;
