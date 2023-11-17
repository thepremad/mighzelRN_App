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
    const token = yield call(getData, async_keys.auth_token);
    if (token) {
      const response = yield call(makeRequest, `user_detail?token=${token}`);
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
