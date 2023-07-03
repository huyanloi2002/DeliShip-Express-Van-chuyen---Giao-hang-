import { TYPES } from "../actions/actionTypes";

export const contactReducer = (state = { contacts: [] }, action) => {
  switch (action.type) {
    case TYPES.CONTACT:
      return {
        contacts: action.payload,
      };
    default:
      return state;
  }
};
