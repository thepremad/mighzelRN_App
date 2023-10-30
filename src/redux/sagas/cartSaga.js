/* eslint-disable prettier/prettier */
import {call, put, takeLatest} from 'redux-saga/effects';
import {FETCH_CART_DATA_REQUEST} from '../action/ActionTypes';
import {} from '../action/homeActions';
import {async_keys, getData} from '../../storage/UserPreference';
import {showSnack} from '../../components/Snackbar';
import {makeRequest} from '../../api/ApiInfo';
import {
  fetchCartDataFailure,
  fetchCartDataSuccess,
} from '../action/cartActions';

function* fetchCart() {
  try {
    const cartData = yield call(getData, async_keys.cart_data);

    if (cartData && cartData.length !== 0) {
      yield put(fetchCartDataSuccess(cartData));
    } else {
      const token = yield call(getData, async_keys.auth_token);
      if (token) {
        const response = yield call(
          makeRequest,
          `get_user_cart?token=${token}`,
        );
        const {Status, Message} = response;

        if (Status === true) {
          const {Data} = response;

          yield put(fetchCartDataSuccess(Data));
        } else {
          yield call(showSnack, Message, null, true);
          yield put(fetchCartDataFailure(Message));
        }
      } else {
        yield put(fetchCartDataFailure('cart data not found'));
      }
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    yield put(fetchCartDataFailure(error.message));
  }
}

export function* watchFetchCart() {
  yield takeLatest(FETCH_CART_DATA_REQUEST, fetchCart);
}
