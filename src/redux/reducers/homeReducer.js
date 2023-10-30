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
} from '../action/ActionTypes';

const initialHomeState = {
  homeDataFirst: {},
  homeDataSecond: {},
  homeDataThird: {},

  isLoadingFirst: false,
  isLoadingSecond: false,
  isLoadingThird: false,

  shimmerFirst: true,
  shimmerSecond: true,
  shimmerThird: true,

  errorFirst: null,
  errorSecond: null,
  errorThird: null,
};

const homeReducer = (state = initialHomeState, action) => {
  switch (action.type) {
    // FIRST
    case FETCH_HOME_DATA_REQUEST_1:
      console.log(FETCH_HOME_DATA_REQUEST_1);
      return {
        ...state,
        isLoadingFirst: state.homeDataFirst.length === 0,
        shimmerFirst: true,
        errorFirst: null,
      };

    case FETCH_HOME_DATA_SUCCESS_1:
      console.log(FETCH_HOME_DATA_SUCCESS_1);
      return {
        ...state,
        homeDataFirst: action.payload,
        isLoadingFirst: false,
        shimmerFirst: false,
      };

    case FETCH_HOME_DATA_FAILURE_1:
      console.log(FETCH_HOME_DATA_FAILURE_1, action.payload);
      return {
        ...state,
        homeDataFirst: {},
        isLoadingFirst: false,
        shimmerFirst: false,
        errorFirst: action.payload,
      };

    // SECOND
    case FETCH_HOME_DATA_REQUEST_2:
      console.log(FETCH_HOME_DATA_REQUEST_2);
      return {
        ...state,
        isLoadingSecond: state.homeDataFirst.length === 0,
        shimmerSecond: true,
        errorSecond: null,
      };

    case FETCH_HOME_DATA_SUCCESS_2:
      console.log(FETCH_HOME_DATA_SUCCESS_2);
      return {
        ...state,
        homeDataSecond: action.payload,
        isLoadingSecond: false,
        shimmerSecond: false,
      };

    case FETCH_HOME_DATA_FAILURE_2:
      console.log(FETCH_HOME_DATA_FAILURE_2);
      return {
        ...state,
        homeDataSecond: {},
        isLoadingSecond: false,
        shimmerSecond: false,
        errorSecond: action.payload,
      };

    // THIRD
    case FETCH_HOME_DATA_REQUEST_3:
      console.log(FETCH_HOME_DATA_REQUEST_3);
      return {
        ...state,
        isLoadingThird: state.homeDataFirst.length === 0,
        shimmerThird: true,
        errorThird: null,
      };

    case FETCH_HOME_DATA_SUCCESS_3:
      console.log(FETCH_HOME_DATA_SUCCESS_3);
      return {
        ...state,
        homeDataThird: action.payload,
        isLoadingThird: false,
        shimmerThird: false,
      };

    case FETCH_HOME_DATA_FAILURE_3:
      console.log(FETCH_HOME_DATA_FAILURE_3);
      return {
        ...state,
        homeDataThird: {},
        isLoadingThird: false,
        shimmerThird: false,
        errorThird: action.payload,
      };

    default:
      return state;
  }
};

export default homeReducer;
