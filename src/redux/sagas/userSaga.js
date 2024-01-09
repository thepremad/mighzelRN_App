import {call, put, takeLatest} from 'redux-saga/effects';
import {makeRequest} from '../../api/ApiInfo';
import {showSnack} from '../../components/Snackbar';
import {async_keys, getData} from '../../storage/UserPreference';
import {FETCH_USER_DATA_REQUEST} from '../action/ActionTypes';
import {
  fetchUserDataFailure,
  fetchUserDataSuccess,
} from '../action/userActions';

function* fetchUser() {
  try {
    const customer_id = yield call(getData, async_keys.customer_id);
    if (customer_id) {
      const response = yield call(
        makeRequest,
        `customer_detail?customer_id=${customer_id}`,
      );
      const {Status, Message} = response;

      if (Status === true) {
        const {Data} = response;

        yield put(fetchUserDataSuccess(Data));
      } else {
        yield call(showSnack, Message, null, true);
        yield put(fetchUserDataFailure(Message));
      }
    } else {
      yield put(fetchUserDataFailure('user data not found'));
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    yield put(fetchUserDataFailure(error.message));
  }
}

export function* watchFetchUser() {
  yield takeLatest(FETCH_USER_DATA_REQUEST, fetchUser);
}
