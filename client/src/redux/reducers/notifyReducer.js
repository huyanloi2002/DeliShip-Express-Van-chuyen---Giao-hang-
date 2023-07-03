import { TYPES } from "../actions/actionTypes";

const initialState = {
  loading: false,
  data: [],
  sound: false,
  dataPopupNoti: {},
};

const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_NOTIFIES:
      return {
        ...state,
        data: action.payload,
      };
    case TYPES.CREATE_NOTIFIES:
      return {
        ...state,
        data: [action.payload, ...state.data],
        dataPopupNoti: action.payload,
      };
    case TYPES.REMOVE_NOTIFIES:
      return {
        ...state,
        data: state.data.filter(
          (item) =>
            item.id !== action.payload.id || item.url !== action.payload.url
        ),
      };
    case TYPES.UPDATE_NOTIFIES:
      const updatedData = state.data.map((item) =>
        item.id === action.payload.id && item.text === action.payload.text
          ? { ...item, isRead: true }
          : item
      );
      return {
        ...state,
        data: updatedData,
      };
    case TYPES.UPDATE_SOUND:
      return {
        ...state,
        sound: action.payload,
      };
    default:
      return state;
  }
};

export default notifyReducer;
