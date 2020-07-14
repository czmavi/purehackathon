import { combineReducers } from 'redux';
import auth from './auth';
import users from './users';
import devices from './devices';
import groups from './groups';
import companies from './companies';

const rootReducer = combineReducers({
  auth,
  users,
  devices,
  groups,
  companies,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
