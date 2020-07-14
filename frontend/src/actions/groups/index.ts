import {
  GROUPS_GET_BY_ID,
  GROUPS_GET_BY_ID_REQUEST,
  GROUPS_GET_BY_ID_REQUEST_FAIL,
  GROUPS_GET_BY_ID_REQUEST_SUCCESS,
  GROUPS_GET,
  GROUPS_GET_REQUEST,
  GROUPS_GET_REQUEST_FAIL,
  GROUPS_GET_REQUEST_SUCCESS,
  ActionTypes,
  GROUPS_UPDATE,
  GROUPS_UPDATE_REQUEST_FAIL,
  GROUPS_UPDATE_REQUEST_SUCCESS,
  GROUPS_UPDATE_REQUEST,
} from './types';
import { Group } from '../../../../common/model/group';

export const groupsGetByIdAction = (id: string): ActionTypes => ({
  payload: {
    id,
  },
  type: GROUPS_GET_BY_ID,
});

export const groupsGetByIdRequestAction = (id: string): ActionTypes => ({
  payload: {
    id,
  },
  type: GROUPS_GET_BY_ID_REQUEST,
});

export const groupsGetByIdRequestFailAction = (error: string): ActionTypes => ({
  payload: {
    error,
  },
  type: GROUPS_GET_BY_ID_REQUEST_FAIL,
});

export const groupsGetByIdRequestSuccessAction = (item: Group): ActionTypes => ({
  payload: {
    item,
  },
  type: GROUPS_GET_BY_ID_REQUEST_SUCCESS,
});

export const groupsGetAction = (page: number, size: number): ActionTypes => ({
  payload: {
    page,
    size,
  },
  type: GROUPS_GET,
});

export const groupsGetRequestAction = (page: number, size: number): ActionTypes => ({
  payload: {
    page,
    size,
  },
  type: GROUPS_GET_REQUEST,
});

export const groupsGetRequestFailAction = (error: string): ActionTypes => ({
  payload: {
    error,
  },
  type: GROUPS_GET_REQUEST_FAIL,
});

export const groupsGetRequestSuccessAction = (items: Group[], page: number, total: number): ActionTypes => ({
  payload: {
    items,
    page,
    total,
  },
  type: GROUPS_GET_REQUEST_SUCCESS,
});

export const groupsUpdateAction = (item: Group): ActionTypes => ({
  payload: {
    item
  },
  type: GROUPS_UPDATE,
});

export const groupsUpdateRequestAction = (item: Group): ActionTypes => ({
  payload: {
    item,
  },
  type: GROUPS_UPDATE_REQUEST,
});

export const groupsUpdateRequestFailAction = (error: string): ActionTypes => ({
  payload: {
    error,
  },
  type: GROUPS_UPDATE_REQUEST_FAIL,
});

export const groupsUpdateRequestSuccessAction = (item: Group): ActionTypes => ({
  payload: {
    item,
  },
  type: GROUPS_UPDATE_REQUEST_SUCCESS,
});
