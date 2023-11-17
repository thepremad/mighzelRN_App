import {
  FETCH_ORDER_DATA_FAILURE,
  FETCH_ORDER_DATA_REQUEST,
  FETCH_ORDER_DATA_SUCCESS,
} from './ActionTypes';

export const fetchOrderDataRequest = () => ({
  type: FETCH_ORDER_DATA_REQUEST,
});

export const fetchOrderDataSuccess = data => ({
  type: FETCH_ORDER_DATA_SUCCESS,
  payload: data,
});

export const fetchOrderDataFailure = error => ({
  type: FETCH_ORDER_DATA_FAILURE,
  payload: error,
});
