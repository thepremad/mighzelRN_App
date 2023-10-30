import {
  FETCH_HOME_DATA_FAILURE_1,
  FETCH_HOME_DATA_FAILURE_2,
  FETCH_HOME_DATA_FAILURE_3,
  FETCH_HOME_DATA_REQUEST_1,
  FETCH_HOME_DATA_REQUEST_2,
  FETCH_HOME_DATA_REQUEST_3,
  FETCH_HOME_DATA_SUCCESS_1,
  FETCH_HOME_DATA_SUCCESS_2,
  FETCH_HOME_DATA_SUCCESS_3,
} from './ActionTypes';

export const fetchHomeDataFirstRequest = () => ({
  type: FETCH_HOME_DATA_REQUEST_1,
});

export const fetchHomeDataFirstSuccess = data => ({
  type: FETCH_HOME_DATA_SUCCESS_1,
  payload: data,
});

export const fetchHomeDataFirstFailure = error => ({
  type: FETCH_HOME_DATA_FAILURE_1,
  payload: error,
});

export const fetchHomeDataSecondRequest = () => ({
  type: FETCH_HOME_DATA_REQUEST_2,
});

export const fetchHomeDataSecondSuccess = data => ({
  type: FETCH_HOME_DATA_SUCCESS_2,
  payload: data,
});

export const fetchHomeDataSecondFailure = error => ({
  type: FETCH_HOME_DATA_FAILURE_2,
  payload: error,
});

export const fetchHomeDataThirdRequest = () => ({
  type: FETCH_HOME_DATA_REQUEST_3,
});

export const fetchHomeDataThirdSuccess = data => ({
  type: FETCH_HOME_DATA_SUCCESS_3,
  payload: data,
});

export const fetchHomeDataThirdFailure = error => ({
  type: FETCH_HOME_DATA_FAILURE_3,
  payload: error,
});
