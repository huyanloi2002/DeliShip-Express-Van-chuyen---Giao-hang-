import { TYPES } from "../actions/actionTypes";

export const adminReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case TYPES.ORDERS:
      return {
        loading: false,
        orders: action.payload,
      };
    case TYPES.ORDERS_UNCONFIRMED:
      return {
        loading: false,
        orders: action.payload,
      };
    case TYPES.ORDERS_CONFIRMED:
      return {
        loading: false,
        orders: action.payload,
      };
    case TYPES.ORDERS_DELIVERING:
      return {
        loading: false,
        orders: action.payload,
      };
    case TYPES.ORDERS_DELIVERED:
      return {
        loading: false,
        orders: action.payload,
      };
    case TYPES.ORDERS_UNPAID:
      return {
        loading: false,
        orders: action.payload,
      };
    case TYPES.ORDERS_PAID:
      return {
        loading: false,
        orders: action.payload,
      };
    default:
      return state;
  }
};
export default adminReducer;
