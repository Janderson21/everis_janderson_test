import * as BT from "./bookingTypes";
import axios from "axios";

export const saveBooking = (booking) => {
  return (dispatch) => {
    dispatch({
      type: BT.SAVE_BOOK_REQUEST,
    });
    axios
      .post("http://localhost:8080/rest/booking", booking)
      .then((response) => {
        dispatch(bookingSuccess(response.data));
      })
      .catch((error) => {
        dispatch(bookingFailure(error));
      });
  };
};

export const fetchBooking = (bookingId) => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_BOOK_REQUEST,
    });
    axios
      .get("http://localhost:8080/rest/booking/" + bookingId)
      .then((response) => {
        dispatch(bookingSuccess(response.data));
      })
      .catch((error) => {
        dispatch(bookingFailure(error));
      });
  };
};

export const updateBooking = (booking) => {
  return (dispatch) => {
    dispatch({
      type: BT.UPDATE_BOOK_REQUEST,
    });
    axios
      .put("http://localhost:8080/rest/booking", booking)
      .then((response) => {
        dispatch(bookingSuccess(response.data));
      })
      .catch((error) => {
        dispatch(bookingFailure(error));
      });
  };
};

export const deleteBooking = (bookingId) => {
  return (dispatch) => {
    dispatch({
      type: BT.DELETE_BOOK_REQUEST,
    });
    axios
      .delete("http://localhost:8080/rest/booking/" + bookingId)
      .then((response) => {
        dispatch(bookingSuccess(response.data));
      })
      .catch((error) => {
        dispatch(bookingFailure(error));
      });
  };
};

const bookingSuccess = (booking) => {
  return {
    type: BT.BOOK_SUCCESS,
    payload: booking,
  };
};

const bookingFailure = (error) => {
  return {
    type: BT.BOOK_FAILURE,
    payload: error,
  };
};
