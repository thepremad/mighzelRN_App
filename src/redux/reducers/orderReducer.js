import {
  FETCH_ORDER_DATA_FAILURE,
  FETCH_ORDER_DATA_REQUEST,
  FETCH_ORDER_DATA_SUCCESS,
} from '../action/ActionTypes';

const initialHomeState = {
  orderData: [],
  isLoading: false,
  shimmer: true,
  error: null,
};

const orderReducer = (state = initialHomeState, action) => {
  switch (action.type) {
    case FETCH_ORDER_DATA_REQUEST:
      console.log(FETCH_ORDER_DATA_REQUEST);
      return {
        ...state,
        isLoading: state.orderData.length === 0,
        shimmer: true,
        error: null,
      };
    case FETCH_ORDER_DATA_SUCCESS:
      console.log(FETCH_ORDER_DATA_SUCCESS);
      return {
        ...state,
        orderData: action.payload,
        isLoading: false,
        shimmer: false,
      };
    case FETCH_ORDER_DATA_FAILURE:
      console.log(FETCH_ORDER_DATA_FAILURE);
      return {
        ...state,
        orderData: [],
        isLoading: false,
        shimmer: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
