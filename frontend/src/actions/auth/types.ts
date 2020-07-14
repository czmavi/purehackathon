export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_REQUEST_SUCCESS = 'AUTH_LOGIN_REQUEST_SUCCESS';
export const AUTH_LOGIN_REQUEST_FAIL = 'AUTH_LOGIN_REQUEST_FAIL';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export interface AuthLoginRequestAction {
  payload: {
    userName: string,
    password: string,
  };
  type: typeof AUTH_LOGIN_REQUEST;
}

export interface AuthLoginRequestSuccessAction {
  type: typeof AUTH_LOGIN_REQUEST_SUCCESS;
  payload: {
    token: string,
    validUntil: Date,
  };
}

export interface AuthLoginRequestFailAction {
  payload: {
    error: string,
  };
  type: typeof AUTH_LOGIN_REQUEST_FAIL;
}

export interface AuthLogoutAction {
  type: typeof AUTH_LOGOUT;
}

export type ActionTypes = AuthLoginRequestAction | AuthLoginRequestSuccessAction | AuthLoginRequestFailAction
  | AuthLogoutAction;
