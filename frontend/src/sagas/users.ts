import { put, call, select, takeEvery } from 'redux-saga/effects';

import { usersGetRequestAction, usersGetRequestFailAction, usersGetRequestSuccessAction, usersGetByIdRequestAction, usersGetByIdRequestSuccessAction, usersGetByIdRequestFailAction } from '../actions/users';
import { UsersGetAction, USERS_GET, UsersGetByIdAction, USERS_GET_BY_ID } from '../actions/users/types';
import { AppState } from '../reducers';
import { get } from "../utils/fetch";

export function* getUsers({ payload: { page, size } }: UsersGetAction) {
  const state: AppState = yield select();

  if (state.users.pages[page]) {
    return;
  }

  yield put(usersGetRequestAction(page, size));
  try {
    const result = yield call(get, `/api/users?page=${page}&size=${size}`);
    yield put(usersGetRequestSuccessAction(result.items, page, result.total));
  } catch (error) {
    yield put(usersGetRequestFailAction((error as Error).message));
  }
}

export function* getUser({ payload: { id} }: UsersGetByIdAction) {
  const state: AppState = yield select();

  if (state.users.items[id]) {
    return;
  }

  yield put(usersGetByIdRequestAction(id));

  try {
    const result = yield call(get, `/api/users/${id}`);
    yield put(usersGetByIdRequestSuccessAction(result));
  } catch (error) {
    yield put(usersGetByIdRequestFailAction((error as Error).message));
  }
}

export function* watchGetUsers() {
  yield takeEvery(USERS_GET, getUsers);
  yield takeEvery(USERS_GET_BY_ID, getUser);
}
