import {all} from 'redux-saga/effects';
import {watchFetchCart} from './cartSaga';

import {watchFetchHome} from './homeSaga';
import {watchFetchOrder} from './orderSaga';
import {watchFetchCategoryProducts} from './productSaga';
import {watchFetchUser} from './userSaga';

export default function* rootSaga() {
  yield all([
    watchFetchHome(),
    watchFetchCart(),
    watchFetchUser(),
    watchFetchOrder(),
    watchFetchCategoryProducts(),
  ]);
}
