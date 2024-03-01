import {
  FETCH_USER_DATA_FAILURE,
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
} from './ActionTypes';

export const fetchUserDataRequest = () => ({
  type: FETCH_USER_DATA_REQUEST,
});

export const fetchUserDataSuccess = data => ({
  type: FETCH_USER_DATA_SUCCESS,
  payload: data,
});

export const fetchUserDataFailure = error => ({
  type: FETCH_USER_DATA_FAILURE,
  payload: error,
});
