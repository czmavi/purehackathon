import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_REQUEST_FAIL,
  AUTH_LOGIN_REQUEST_SUCCESS,
  AUTH_LOGOUT,
  ActionTypes,
} from '../actions/auth/types';

export interface IAuthState {
  token: string | null;
  validUntil: Date | null;
  fetching: boolean;
  error: string | null;
}

const initialState: IAuthState = {
  error: null,
  fetching: false,
  token: null,
  validUntil: null,
};

const auth = (state: IAuthState = initialState, action: ActionTypes): IAuthState => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST: return { ...state, fetching: true };
    case AUTH_LOGIN_REQUEST_FAIL: return { ...state, fetching: false };
    case AUTH_LOGIN_REQUEST_SUCCESS: return { ...state, fetching: false, ...action.payload };
    case AUTH_LOGOUT: return { ...initialState };
    default: return state;
  }
};

export default auth;
