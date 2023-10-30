import {all} from 'redux-saga/effects';
import {watchFetchCart} from './cartSaga';

import {watchFetchHome} from './homeSaga';

export default function* rootSaga() {
  yield all([watchFetchHome(), watchFetchCart()]);
}
