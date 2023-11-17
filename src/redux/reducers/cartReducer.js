import {
  FETCH_CART_DATA_FAILURE,
  FETCH_CART_DATA_REQUEST,
  FETCH_CART_DATA_SUCCESS,
} from '../action/ActionTypes';

const initialHomeState = {
  cartData: {
    items: [],
    coupons: [],
    fees: [],
    totals: {},
    items_count: 0,
    billing_address: {},
  },
  isLoading: false,
  shimmer: true,
  error: null,
};

const cartReducer = (state = initialHomeState, action) => {
  switch (action.type) {
    case FETCH_CART_DATA_REQUEST:
      console.log(FETCH_CART_DATA_REQUEST);
      return {
        ...state,
        isLoading: true,
        shimmer: true,
        error: null,
      };
    case FETCH_CART_DATA_SUCCESS:
      console.log(FETCH_CART_DATA_SUCCESS, action.payload);
      return {
        ...state,
        cartData: action.payload,
        isLoading: false,
        shimmer: false,
      };
    case FETCH_CART_DATA_FAILURE:
      console.log(FETCH_CART_DATA_FAILURE);
      return {
        ...state,
        cartData: {
          items: [],
          coupons: [],
          fees: [],
          totals: {},
          items_count: 0,
        },
        isLoading: false,
        shimmer: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
