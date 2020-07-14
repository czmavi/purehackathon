import {
  USERS_GET_BY_ID,
  USERS_GET_BY_ID_REQUEST,
  USERS_GET_BY_ID_REQUEST_FAIL,
  USERS_GET_BY_ID_REQUEST_SUCCESS,
  USERS_GET,
  USERS_GET_REQUEST,
  USERS_GET_REQUEST_FAIL,
  USERS_GET_REQUEST_SUCCESS,
  ActionTypes,
} from './types';
import { User } from '../../../../common/model/user';

export const usersGetByIdAction = (id: string): ActionTypes => ({
  payload: {
    id,
  },
  type: USERS_GET_BY_ID,
});

export const usersGetByIdRequestAction = (id: string): ActionTypes => ({
  payload: {
    id,
  },
  type: USERS_GET_BY_ID_REQUEST,
});

export const usersGetByIdRequestFailAction = (error: string): ActionTypes => ({
  payload: {
    error,
  },
  type: USERS_GET_BY_ID_REQUEST_FAIL,
});

export const usersGetByIdRequestSuccessAction = (item: User): ActionTypes => ({
  payload: {
    item,
  },
  type: USERS_GET_BY_ID_REQUEST_SUCCESS,
});

export const usersGetAction = (page: number, size: number): ActionTypes => ({
  payload: {
    page,
    size,
  },
  type: USERS_GET,
});

export const usersGetRequestAction = (page: number, size: number): ActionTypes => ({
  payload: {
    page,
    size,
  },
  type: USERS_GET_REQUEST,
});

export const usersGetRequestFailAction = (error: string): ActionTypes => ({
  payload: {
    error,
  },
  type: USERS_GET_REQUEST_FAIL,
});

export const usersGetRequestSuccessAction = (items: User[], page: number, total: number): ActionTypes => ({
  payload: {
    items,
    page,
    total,
  },
  type: USERS_GET_REQUEST_SUCCESS,
});
