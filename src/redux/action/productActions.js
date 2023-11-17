import {
  FETCH_CATEGORY_PRODUCTS_DATA_FAILURE,
  FETCH_CATEGORY_PRODUCTS_DATA_REQUEST,
  FETCH_CATEGORY_PRODUCTS_DATA_SUCCESS,
} from './ActionTypes';

export const fetchCategoryProductsDataRequest = (category_id, allProducts) => ({
  type: FETCH_CATEGORY_PRODUCTS_DATA_REQUEST,
  payload: {category_id, allProducts},
});

export const fetchCategoryProductsDataSuccess = data => ({
  type: FETCH_CATEGORY_PRODUCTS_DATA_SUCCESS,
  payload: data,
});

export const fetchCategoryProductsDataFailure = error => ({
  type: FETCH_CATEGORY_PRODUCTS_DATA_FAILURE,
  payload: error,
});
