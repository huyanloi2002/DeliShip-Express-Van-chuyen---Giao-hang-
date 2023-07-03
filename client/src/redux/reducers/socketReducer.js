import { TYPES } from "../actions/actionTypes";

const socketReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.SOCKET:
      return action.payload;
    default:
      return state;
  }
};

export default socketReducer;
