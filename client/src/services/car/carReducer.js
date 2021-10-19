import * as BT from "./carTypes";

const initialState = {
  car: "",
  error: "",
};

const carReducer = (state = initialState, action) => {
  switch (action.type) {
    case BT.SAVE_CAR_REQUEST:
    case BT.FETCH_CAR_REQUEST:
    case BT.UPDATE_CAR_REQUEST:
    case BT.DELETE_CAR_REQUEST:
      return {
        ...state,
      };
    case BT.CAR_SUCCESS:
      return {
        car: action.payload,
        error: "",
      };
    case BT.CAR_FAILURE:
      return {
        car: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default carReducer;
