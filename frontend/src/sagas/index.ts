import { all } from 'redux-saga/effects';

import { watchAuthorize } from './auth';
import { watchGetUsers } from './users';
import { watchGetDevices } from './devices';
import { watchGetGroups } from './groups';
import { watchGetCompanies } from './companies';

// use them in parallel
export default function* rootSaga() {
  yield all([
    watchAuthorize(),
    watchGetUsers(),
    watchGetDevices(),
    watchGetGroups(),
    watchGetCompanies(),
  ]);
}
