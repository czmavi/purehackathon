import { Device } from "../../../../common/model/device";

export const DEVICES_GET_BY_ID = 'DEVICES_GET_BY_ID';
export const DEVICES_GET_BY_ID_REQUEST = 'DEVICES_GET_BY_ID_REQUEST';
export const DEVICES_GET_BY_ID_REQUEST_SUCCESS = 'DEVICES_GET_BY_ID_REQUEST_SUCCESS';
export const DEVICES_GET_BY_ID_REQUEST_FAIL = 'DEVICES_GET_BY_ID_REQUEST_FAIL';
export const DEVICES_GET = 'DEVICES_GET';
export const DEVICES_GET_REQUEST = 'DEVICES_GET_REQUEST';
export const DEVICES_GET_REQUEST_SUCCESS = 'DEVICES_GET_REQUEST_SUCCESS';
export const DEVICES_GET_REQUEST_FAIL = 'DEVICES_GET_REQUEST_FAIL';

export interface DevicesGetByIdAction {
  payload: {
    id: string,
  };
  type: typeof DEVICES_GET_BY_ID;
}

export interface DevicesGetByIdRequestAction {
  payload: {
    id: string,
  };
  type: typeof DEVICES_GET_BY_ID_REQUEST;
}

export interface DevicesGetByIdRequestSuccessAction {
  payload: {
    item: Device,
  };
  type: typeof DEVICES_GET_BY_ID_REQUEST_SUCCESS;
}

export interface DevicesGetByIdRequestFailAction {
  payload: {
    error: string,
  };
  type: typeof DEVICES_GET_BY_ID_REQUEST_FAIL;
}

export interface DevicesGetAction {
  payload: {
    page: number,
    size: number,
  };
  type: typeof DEVICES_GET;
}

export interface DevicesGetRequestAction {
  payload: {
    page: number,
    size: number,
  };
  type: typeof DEVICES_GET_REQUEST;
}

export interface DevicesGetRequestSuccessAction {
  payload: {
    items: Device[],
    page: number,
    total: number,
  };
  type: typeof DEVICES_GET_REQUEST_SUCCESS;
}

export interface DevicesGetRequestFailAction {
  payload: {
    error: string,
  };
  type: typeof DEVICES_GET_REQUEST_FAIL;
}

export type ActionTypes = DevicesGetByIdAction | DevicesGetByIdRequestAction | DevicesGetByIdRequestFailAction
  | DevicesGetByIdRequestSuccessAction | DevicesGetAction | DevicesGetRequestAction | DevicesGetRequestFailAction
  | DevicesGetRequestSuccessAction;
