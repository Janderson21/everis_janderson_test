import * as BT from "./carTypes";
import axios from "axios";

export const saveCar = (car) => {
  return (dispatch) => {
    dispatch({
      type: BT.SAVE_CAR_REQUEST,
    });
    axios
      .post("http://localhost:8080/rest/car", car)
      .then((response) => {
        dispatch(carSuccess(response.data));
      })
      .catch((error) => {
        dispatch(carFailure(error));
      });
  };
};

export const fetchCar = (carId) => {
  return (dispatch) => {
    dispatch({
      type: BT.FETCH_CAR_REQUEST,
    });
    axios
      .get("http://localhost:8080/rest/car/" + carId)
      .then((response) => {
        dispatch(carSuccess(response.data));
      })
      .catch((error) => {
        dispatch(carFailure(error));
      });
  };
};

export const updateCar = (car) => {
  return (dispatch) => {
    dispatch({
      type: BT.UPDATE_CAR_REQUEST,
    });
    axios
      .put("http://localhost:8080/rest/car", car)
      .then((response) => {
        dispatch(carSuccess(response.data));
      })
      .catch((error) => {
        dispatch(carFailure(error));
      });
  };
};

export const deleteCar = (carId) => {
  return (dispatch) => {
    dispatch({
      type: BT.DELETE_CAR_REQUEST,
    });
    axios
      .delete("http://localhost:8080/rest/car/" + carId)
      .then((response) => {
        dispatch(carSuccess(response.data));
      })
      .catch((error) => {
        dispatch(carFailure(error));
      });
  };
};

const carSuccess = (car) => {
  return {
    type: BT.CAR_SUCCESS,
    payload: car,
  };
};

const carFailure = (error) => {
  return {
    type: BT.CAR_FAILURE,
    payload: error,
  };
};
