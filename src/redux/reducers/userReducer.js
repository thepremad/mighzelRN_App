import {
  FETCH_USER_DATA_FAILURE,
  FETCH_USER_DATA_REQUEST,
  FETCH_USER_DATA_SUCCESS,
} from '../action/ActionTypes';

const initialHomeState = {
  userData: {},
  isLoading: false,
  shimmer: true,
  error: null,
};

const userReducer = (state = initialHomeState, action) => {
  switch (action.type) {
    case FETCH_USER_DATA_REQUEST:
      console.log(FETCH_USER_DATA_REQUEST);
      return {
        ...state,
        isLoading: true,
        shimmer: state.userData.length === 0,
        error: null,
      };
    case FETCH_USER_DATA_SUCCESS:
      console.log(FETCH_USER_DATA_SUCCESS);
      return {
        ...state,
        userData: action.payload,
        isLoading: false,
        shimmer: false,
      };
    case FETCH_USER_DATA_FAILURE:
      console.log(FETCH_USER_DATA_FAILURE);
      return {
        ...state,
        userData: {},
        isLoading: false,
        shimmer: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
