import {
  FETCH_CART_DATA_FAILURE,
  FETCH_CART_DATA_REQUEST,
  FETCH_CART_DATA_SUCCESS,
} from './ActionTypes';

export const fetchCartDataRequest = () => ({
  type: FETCH_CART_DATA_REQUEST,
});

export const fetchCartDataSuccess = data => ({
  type: FETCH_CART_DATA_SUCCESS,
  payload: data,
});

export const fetchCartDataFailure = error => ({
  type: FETCH_CART_DATA_FAILURE,
  payload: error,
});
