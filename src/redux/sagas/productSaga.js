import {call, put, takeLatest} from 'redux-saga/effects';
import {makeRequest} from '../../api/ApiInfo';
import {showSnack} from '../../components/Snackbar';
import {async_keys, getData} from '../../storage/UserPreference';
import {FETCH_CATEGORY_PRODUCTS_DATA_REQUEST} from '../action/ActionTypes';
import {
  fetchCategoryProductsDataFailure,
  fetchCategoryProductsDataSuccess,
} from '../action/productActions';

function* fetchCategoryProducts(action) {
  try {
    const {category_id, allProducts} = action.payload;
    const found = allProducts.filter(
      item => Number(item.category_id) === Number(category_id),
    );
    if (found.length < 1) {
      const response = yield call(
        makeRequest,
        `category_products?category_id=${category_id}`,
      );
      const {Status, Message} = response;

      if (Status === true) {
        const {Data} = response;

        yield put(fetchCategoryProductsDataSuccess([...allProducts, Data]));
      } else {
        yield call(showSnack, Message, null, true);
        yield put(fetchCategoryProductsDataFailure(Message));
      }
    } else {
      yield put(fetchCategoryProductsDataSuccess(allProducts));
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    yield put(fetchCategoryProductsDataFailure(error.message));
  }
}

export function* watchFetchCategoryProducts() {
  yield takeLatest(FETCH_CATEGORY_PRODUCTS_DATA_REQUEST, fetchCategoryProducts);
}
