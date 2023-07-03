import { TYPES } from "../actions/actionTypes";

export const orderByUser = (state = { data: [] }, action) => {
  switch (action.type) {
    case TYPES.ORDER_BY_USER:
      return {
        ...state,
        data: action.payload,
      };
    case TYPES.UPDATE_ORDER_USER:
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };

    default:
      return state;
  }
};
export const orderById = (state = { dataOrderId: {} }, action) => {
  switch (action.type) {
    case TYPES.ORDER_BY_ID:
      return {
        ...state,
        dataOrderId: action.payload,
      };
    case TYPES.UPDATE_ORDER_ID:
      return {
        ...state,
        dataOrderId: action.payload,
      };

    default:
      return state;
  }
};
