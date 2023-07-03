import { TYPES } from "../actions/actionTypes";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.USER:
      return action.payload;
    default:
      return state;
  }
};
export const allUserReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.USERS:
      return action.payload;
    default:
      return state;
  }
};
