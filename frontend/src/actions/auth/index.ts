import {
  AUTH_LOGIN_REQUEST, AUTH_LOGIN_REQUEST_SUCCESS, AUTH_LOGIN_REQUEST_FAIL, AUTH_LOGOUT, ActionTypes,
} from './types';

export const authLoginRequestAction = (userName: string, password: string): ActionTypes => ({
  payload: {
    password,
    userName,
  },
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginRequestSuccessAction = (token: string, validUntil: Date): ActionTypes => ({
  payload: {
    token,
    validUntil,
  },
  type: AUTH_LOGIN_REQUEST_SUCCESS,
});

export const authLoginRequestFailAction = (error: string): ActionTypes => ({
  payload: {
    error,
  },
  type: AUTH_LOGIN_REQUEST_FAIL,
});

export const authLogoutAction = (): ActionTypes => ({
  type: AUTH_LOGOUT,
});
