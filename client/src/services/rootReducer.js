import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import authReducer from "./user/auth/authReducer";
import bookingReducer from "./booking/bookingReducer";
import carReducer from "./car/carReducer";

const rootReducer = combineReducers({
  user: userReducer,
  booking: bookingReducer,
  auth: authReducer,
  car: carReducer,
});

export default rootReducer;
