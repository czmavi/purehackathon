import { put, call, select, takeEvery } from 'redux-saga/effects';

import { groupsGetRequestAction, groupsGetRequestFailAction, groupsGetRequestSuccessAction, groupsGetByIdRequestAction, groupsGetByIdRequestSuccessAction, groupsGetByIdRequestFailAction, groupsUpdateRequestAction, groupsUpdateRequestSuccessAction, groupsUpdateRequestFailAction } from '../actions/groups';
import { GroupsGetAction, GROUPS_GET, GroupsGetByIdAction, GROUPS_GET_BY_ID, GroupsUpdateRequestFailAction, GroupsUpdateAction, GROUPS_UPDATE } from '../actions/groups/types';
import { AppState } from '../reducers';
import { get, patch } from "../utils/fetch";

export function* getGroups({ payload: { page, size } }: GroupsGetAction) {
  const state: AppState = yield select();

  if (state.groups.pages[page]) {
    return;
  }

  yield put(groupsGetRequestAction(page, size));
  try {
    const result = yield call(get, `/api/groups?page=${page}&size=${size}`);
    yield put(groupsGetRequestSuccessAction(result.items, page, result.total));
  } catch (error) {
    yield put(groupsGetRequestFailAction((error as Error).message));
  }
}

export function* getGroup({ payload: { id} }: GroupsGetByIdAction) {
  const state: AppState = yield select();

  if (state.groups.items[id]) {
    return;
  }

  yield put(groupsGetByIdRequestAction(id));

  try {
    const result = yield call(get, `/api/groups/${id}`);
    yield put(groupsGetByIdRequestSuccessAction(result));
  } catch (error) {
    yield put(groupsGetByIdRequestFailAction((error as Error).message));
  }
}

export function* updateGroup({ payload: { item } }: GroupsUpdateAction) {
  yield put(groupsUpdateRequestAction(item));

  try {
    const result = yield call(patch, `/api/groups/${item._id}`, item);
    yield put(groupsUpdateRequestSuccessAction(item));
  } catch (error) {
    yield put(groupsUpdateRequestFailAction((error as Error).message));
  }
}

export function* watchGetGroups() {
  yield takeEvery(GROUPS_GET, getGroups);
  yield takeEvery(GROUPS_GET_BY_ID, getGroup);
  yield takeEvery(GROUPS_UPDATE, updateGroup);
}
