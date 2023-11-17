import {
  FETCH_CATEGORY_PRODUCTS_DATA_FAILURE,
  FETCH_CATEGORY_PRODUCTS_DATA_REQUEST,
  FETCH_CATEGORY_PRODUCTS_DATA_SUCCESS,
} from '../action/ActionTypes';

const initialHomeState = {
  allProducts: [],
  isLoading: true,
  shimmer: true,
  error: null,
};

const productReducer = (state = initialHomeState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_PRODUCTS_DATA_REQUEST:
      console.log(FETCH_CATEGORY_PRODUCTS_DATA_REQUEST);
      return {
        ...state,
        isLoading: true,
        shimmer: true,
        error: null,
      };

    //
    case FETCH_CATEGORY_PRODUCTS_DATA_SUCCESS:
      console.log(FETCH_CATEGORY_PRODUCTS_DATA_SUCCESS);
      return {
        ...state,
        allProducts: action.payload,
        isLoading: false,
        shimmer: false,
      };

    //
    case FETCH_CATEGORY_PRODUCTS_DATA_FAILURE:
      console.log(FETCH_CATEGORY_PRODUCTS_DATA_FAILURE);
      return {
        ...state,
        isLoading: false,
        shimmer: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
