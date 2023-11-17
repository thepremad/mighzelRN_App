import {call, put, takeLatest} from 'redux-saga/effects';
import {makeRequest} from '../../api/ApiInfo';
import {showSnack} from '../../components/Snackbar';
import {async_keys, getData} from '../../storage/UserPreference';
import {FETCH_ORDER_DATA_REQUEST} from '../action/ActionTypes';
import {
  fetchOrderDataFailure,
  fetchOrderDataSuccess,
} from '../action/orderActions';

function* fetchOrder() {
  try {
    const customer_id = yield call(getData, async_keys.customer_id);
    if (customer_id) {
      const response = yield call(
        makeRequest,
        `orders?customer_id=${customer_id}`,
      );
      const {Status, Message} = response;

      if (Status === true) {
        const {Data} = response;

        yield put(fetchOrderDataSuccess(Data));
      } else {
        yield call(showSnack, Message, null, true);
        yield put(fetchOrderDataFailure(Message));
      }
    } else {
      yield put(fetchOrderDataFailure('order data not found'));
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    yield put(fetchOrderDataFailure(error.message));
  }
}

export function* watchFetchOrder() {
  yield takeLatest(FETCH_ORDER_DATA_REQUEST, fetchOrder);
}
