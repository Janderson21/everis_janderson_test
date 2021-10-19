import * as BT from "./bookingTypes";

const initialState = {
  booking: "",
  error: "",
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case BT.SAVE_BOOK_REQUEST:
    case BT.FETCH_BOOK_REQUEST:
    case BT.UPDATE_BOOK_REQUEST:
    case BT.DELETE_BOOK_REQUEST:
      return {
        ...state,
      };
    case BT.BOOK_SUCCESS:
      return {
        booking: action.payload,
        error: "",
      };
    case BT.BOOK_FAILURE:
      return {
        message: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bookingReducer;
