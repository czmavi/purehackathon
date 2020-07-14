import {
  DEVICES_GET_BY_ID,
  DEVICES_GET_BY_ID_REQUEST,
  DEVICES_GET_BY_ID_REQUEST_FAIL,
  DEVICES_GET_BY_ID_REQUEST_SUCCESS,
  DEVICES_GET,
  DEVICES_GET_REQUEST,
  DEVICES_GET_REQUEST_FAIL,
  DEVICES_GET_REQUEST_SUCCESS,
  ActionTypes,
} from './types';
import { Device } from '../../../../common/model/device';

export const devicesGetByIdAction = (id: string): ActionTypes => ({
  payload: {
    id,
  },
  type: DEVICES_GET_BY_ID,
});

export const devicesGetByIdRequestAction = (id: string): ActionTypes => ({
  payload: {
    id,
  },
  type: DEVICES_GET_BY_ID_REQUEST,
});

export const devicesGetByIdRequestFailAction = (error: string): ActionTypes => ({
  payload: {
    error,
  },
  type: DEVICES_GET_BY_ID_REQUEST_FAIL,
});

export const devicesGetByIdRequestSuccessAction = (item: Device): ActionTypes => ({
  payload: {
    item,
  },
  type: DEVICES_GET_BY_ID_REQUEST_SUCCESS,
});

export const devicesGetAction = (page: number, size: number): ActionTypes => ({
  payload: {
    page,
    size,
  },
  type: DEVICES_GET,
});

export const devicesGetRequestAction = (page: number, size: number): ActionTypes => ({
  payload: {
    page,
    size,
  },
  type: DEVICES_GET_REQUEST,
});

export const devicesGetRequestFailAction = (error: string): ActionTypes => ({
  payload: {
    error,
  },
  type: DEVICES_GET_REQUEST_FAIL,
});

export const devicesGetRequestSuccessAction = (items: Device[], page: number, total: number): ActionTypes => ({
  payload: {
    items,
    page,
    total,
  },
  type: DEVICES_GET_REQUEST_SUCCESS,
});
