import { put, call, select, takeEvery } from 'redux-saga/effects';

import { companiesGetRequestAction, companiesGetRequestFailAction, companiesGetRequestSuccessAction, companiesGetByIdRequestAction, companiesGetByIdRequestSuccessAction, companiesGetByIdRequestFailAction } from '../actions/companies';
import { CompaniesGetAction, COMPANIES_GET, CompaniesGetByIdAction, COMPANIES_GET_BY_ID } from '../actions/companies/types';
import { AppState } from '../reducers';
import { get } from "../utils/fetch";

export function* getDevices({ payload: { page, size } }: CompaniesGetAction) {
  const state: AppState = yield select();

  if (state.companies.pages[page]) {
    return;
  }

  yield put(companiesGetRequestAction(page, size));
  try {
    const result = yield call(get, `/api/companies?page=${page}&size=${size}`);
    yield put(companiesGetRequestSuccessAction(result.items, page, result.total));
  } catch (error) {
    yield put(companiesGetRequestFailAction((error as Error).message));
  }
}

export function* getDevice({ payload: { id} }: CompaniesGetByIdAction) {
  const state: AppState = yield select();

  if (state.companies.items[id]) {
    return;
  }

  yield put(companiesGetByIdRequestAction(id));

  try {
    const result = yield call(get, `/api/companies/${id}`);
    yield put(companiesGetByIdRequestSuccessAction(result));
  } catch (error) {
    yield put(companiesGetByIdRequestFailAction((error as Error).message));
  }
}

export function* watchGetCompanies() {
  yield takeEvery(COMPANIES_GET, getDevices);
  yield takeEvery(COMPANIES_GET_BY_ID, getDevice);
}
