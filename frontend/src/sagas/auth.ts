import { call, put, takeEvery } from 'redux-saga/effects';

import { post } from '../utils/fetch';
import {
  AUTH_LOGIN_REQUEST,
  AuthLoginRequestAction,
} from '../actions/auth/types';

import { authLoginRequestFailAction, authLoginRequestSuccessAction } from '../actions/auth';

export function* authorize({ payload: { userName, password } }: AuthLoginRequestAction) {
  try {
    const { token, validUntil } = yield call(post, '/api/auth/user', {
      password,
      email: userName,
    });

    yield put(authLoginRequestSuccessAction(token, new Date(validUntil)));
    return token;
  } catch (error) {
    yield put(authLoginRequestFailAction((error as Error).message));
  }
}

export function* watchAuthorize() {
  yield takeEvery(AUTH_LOGIN_REQUEST, authorize);
}
