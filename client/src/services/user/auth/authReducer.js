import { LOGIN_REQUEST, LOGOUT_REQUEST, SUCCESS, FAILURE } from "./authTypes";

const initialState = {
  id: localStorage.getItem("idUser"),
  username: localStorage.getItem("username"),
  isLoggedIn: localStorage.getItem("isLoggedIn"),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
      };
    case SUCCESS:
    case FAILURE:
      return {
        id: action.payload.id, 
        username: action.payload.username,
        isLoggedIn: action.payload.isLoggedIn,
      };
    default:
      return state;
  }
};

export default authReducer;
