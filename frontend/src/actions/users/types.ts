import { User } from "../../../../common/model/user";

export const USERS_GET_BY_ID = 'USERS_GET_BY_ID';
export const USERS_GET_BY_ID_REQUEST = 'USERS_GET_BY_ID_REQUEST';
export const USERS_GET_BY_ID_REQUEST_SUCCESS = 'USERS_GET_BY_ID_REQUEST_SUCCESS';
export const USERS_GET_BY_ID_REQUEST_FAIL = 'USERS_GET_BY_ID_REQUEST_FAIL';
export const USERS_GET = 'USERS_GET';
export const USERS_GET_REQUEST = 'USERS_GET_REQUEST';
export const USERS_GET_REQUEST_SUCCESS = 'USERS_GET_REQUEST_SUCCESS';
export const USERS_GET_REQUEST_FAIL = 'USERS_GET_REQUEST_FAIL';

export interface UsersGetByIdAction {
  payload: {
    id: string,
  };
  type: typeof USERS_GET_BY_ID;
}

export interface UsersGetByIdRequestAction {
  payload: {
    id: string,
  };
  type: typeof USERS_GET_BY_ID_REQUEST;
}

export interface UsersGetByIdRequestSuccessAction {
  payload: {
    item: User,
  };
  type: typeof USERS_GET_BY_ID_REQUEST_SUCCESS;
}

export interface UsersGetByIdRequestFailAction {
  payload: {
    error: string,
  };
  type: typeof USERS_GET_BY_ID_REQUEST_FAIL;
}

export interface UsersGetAction {
  payload: {
    page: number,
    size: number,
  };
  type: typeof USERS_GET;
}

export interface UsersGetRequestAction {
  payload: {
    page: number,
    size: number,
  };
  type: typeof USERS_GET_REQUEST;
}

export interface UsersGetRequestSuccessAction {
  payload: {
    items: User[],
    page: number,
    total: number,
  };
  type: typeof USERS_GET_REQUEST_SUCCESS;
}

export interface UsersGetRequestFailAction {
  payload: {
    error: string,
  };
  type: typeof USERS_GET_REQUEST_FAIL;
}

export type ActionTypes = UsersGetByIdAction | UsersGetByIdRequestAction | UsersGetByIdRequestFailAction
  | UsersGetByIdRequestSuccessAction | UsersGetAction | UsersGetRequestAction | UsersGetRequestFailAction
  | UsersGetRequestSuccessAction;
