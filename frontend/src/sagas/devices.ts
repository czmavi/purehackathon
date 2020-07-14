import { put, call, select, takeEvery } from 'redux-saga/effects';

import { devicesGetRequestAction, devicesGetRequestFailAction, devicesGetRequestSuccessAction, devicesGetByIdRequestAction, devicesGetByIdRequestSuccessAction, devicesGetByIdRequestFailAction } from '../actions/devices';
import { DevicesGetAction, DEVICES_GET, DevicesGetByIdAction, DEVICES_GET_BY_ID } from '../actions/devices/types';
import { AppState } from '../reducers';
import { get } from "../utils/fetch";

export function* getDevices({ payload: { page, size } }: DevicesGetAction) {
  const state: AppState = yield select();

  if (state.devices.pages[page]) {
    return;
  }

  yield put(devicesGetRequestAction(page, size));
  try {
    const result = yield call(get, `/api/devices?page=${page}&size=${size}`);
    yield put(devicesGetRequestSuccessAction(result.items, page, result.total));
  } catch (error) {
    yield put(devicesGetRequestFailAction((error as Error).message));
  }
}

export function* getDevice({ payload: { id} }: DevicesGetByIdAction) {
  const state: AppState = yield select();

  if (state.devices.items[id]) {
    return;
  }

  yield put(devicesGetByIdRequestAction(id));

  try {
    const result = yield call(get, `/api/devices/${id}`);
    yield put(devicesGetByIdRequestSuccessAction(result));
  } catch (error) {
    yield put(devicesGetByIdRequestFailAction((error as Error).message));
  }
}

export function* watchGetDevices() {
  yield takeEvery(DEVICES_GET, getDevices);
  yield takeEvery(DEVICES_GET_BY_ID, getDevice);
}
