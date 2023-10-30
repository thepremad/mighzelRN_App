/* eslint-disable prettier/prettier */
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  FETCH_HOME_DATA_REQUEST_1,
  FETCH_HOME_DATA_REQUEST_2,
  FETCH_HOME_DATA_REQUEST_3,
} from '../action/ActionTypes';
import {
  fetchHomeDataFirstFailure,
  fetchHomeDataFirstSuccess,
  fetchHomeDataSecondFailure,
  fetchHomeDataSecondSuccess,
  fetchHomeDataThirdFailure,
  fetchHomeDataThirdSuccess,
} from '../action/homeActions';
import {async_keys, getData} from '../../storage/UserPreference';
import {showSnack} from '../../components/Snackbar';
import {BASE_URL, makeRequest} from '../../api/ApiInfo';

function* fetchHomeFirst() {
  try {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const response = yield call(makeRequest, `home_details_1`);

    const {Status, Message} = response;

    if (Status === true) {
      const {Data} = response;

      yield put(fetchHomeDataFirstSuccess(Data));
      yield put({type: FETCH_HOME_DATA_REQUEST_2});
    } else {
      yield call(showSnack, Message, null, true);
      yield put(fetchHomeDataFirstFailure(Message));
    }
  } catch (error) {
    console.log('catch_' + FETCH_HOME_DATA_REQUEST_1, error);
    // Handle any errors that occurred during the request
    yield put(fetchHomeDataFirstFailure(error.message));
  }
}

function* fetchHomeSecond() {
  try {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const response = yield call(makeRequest, `home_details_2`);

    const {Status, Message} = response;

    if (Status === true) {
      const {Data} = response;

      yield put(fetchHomeDataSecondSuccess(Data));
      yield put({type: FETCH_HOME_DATA_REQUEST_3});
    } else {
      yield call(showSnack, Message, null, true);
      yield put(fetchHomeDataSecondFailure(Message));
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    yield put(fetchHomeDataSecondFailure(error.message));
  }
}

function* fetchHomeThird() {
  try {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    const response = yield call(makeRequest, `home_details_3`);

    const {Status, Message} = response;

    if (Status === true) {
      const {Data} = response;

      yield put(fetchHomeDataThirdSuccess(Data));
    } else {
      yield call(showSnack, Message, null, true);
      yield put(fetchHomeDataThirdFailure(Message));
    }
  } catch (error) {
    // Handle any errors that occurred during the request
    yield put(fetchHomeDataThirdFailure(error.message));
  }
}

export function* watchFetchHome() {
  yield takeLatest(FETCH_HOME_DATA_REQUEST_1, fetchHomeFirst);
  yield takeLatest(FETCH_HOME_DATA_REQUEST_2, fetchHomeSecond);
  yield takeLatest(FETCH_HOME_DATA_REQUEST_3, fetchHomeThird);
}
