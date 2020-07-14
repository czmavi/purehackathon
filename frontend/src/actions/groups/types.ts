import { Group } from "../../../../common/model/group";

export const GROUPS_GET_BY_ID = 'GROUPS_GET_BY_ID';
export const GROUPS_GET_BY_ID_REQUEST = 'GROUPS_GET_BY_ID_REQUEST';
export const GROUPS_GET_BY_ID_REQUEST_SUCCESS = 'GROUPS_GET_BY_ID_REQUEST_SUCCESS';
export const GROUPS_GET_BY_ID_REQUEST_FAIL = 'GROUPS_GET_BY_ID_REQUEST_FAIL';
export const GROUPS_GET = 'GROUPS_GET';
export const GROUPS_GET_REQUEST = 'GROUPS_GET_REQUEST';
export const GROUPS_GET_REQUEST_SUCCESS = 'GROUPS_GET_REQUEST_SUCCESS';
export const GROUPS_GET_REQUEST_FAIL = 'GROUPS_GET_REQUEST_FAIL';
export const GROUPS_UPDATE = 'GROUPS_UPDATE';
export const GROUPS_UPDATE_REQUEST = 'GROUPS_UPDATE_REQUEST';
export const GROUPS_UPDATE_REQUEST_SUCCESS = 'GROUPS_UPDATE_REQUEST_SUCCESS';
export const GROUPS_UPDATE_REQUEST_FAIL = 'GROUPS_UPDATE_REQUEST_FAIL';

export interface GroupsGetByIdAction {
  payload: {
    id: string,
  };
  type: typeof GROUPS_GET_BY_ID;
}

export interface GroupsGetByIdRequestAction {
  payload: {
    id: string,
  };
  type: typeof GROUPS_GET_BY_ID_REQUEST;
}

export interface GroupsGetByIdRequestSuccessAction {
  payload: {
    item: Group,
  };
  type: typeof GROUPS_GET_BY_ID_REQUEST_SUCCESS;
}

export interface GroupsGetByIdRequestFailAction {
  payload: {
    error: string,
  };
  type: typeof GROUPS_GET_BY_ID_REQUEST_FAIL;
}

export interface GroupsGetAction {
  payload: {
    page: number,
    size: number,
  };
  type: typeof GROUPS_GET;
}

export interface GroupsGetRequestAction {
  payload: {
    page: number,
    size: number,
  };
  type: typeof GROUPS_GET_REQUEST;
}

export interface GroupsGetRequestSuccessAction {
  payload: {
    items: Group[],
    page: number,
    total: number,
  };
  type: typeof GROUPS_GET_REQUEST_SUCCESS;
}

export interface GroupsGetRequestFailAction {
  payload: {
    error: string,
  };
  type: typeof GROUPS_GET_REQUEST_FAIL;
}

export interface GroupsUpdateAction {
  payload: {
    item: Group,
  };
  type: typeof GROUPS_UPDATE;
}

export interface GroupsUpdateRequestAction {
  payload: {
    item: Group
  };
  type: typeof GROUPS_UPDATE_REQUEST;
}

export interface GroupsUpdateSuccessAction {
  payload: {
    item: Group,
  };
  type: typeof GROUPS_UPDATE_REQUEST_SUCCESS;
}

export interface GroupsUpdateRequestFailAction {
  payload: {
    error: string,
  };
  type: typeof GROUPS_UPDATE_REQUEST_FAIL;
}

export type ActionTypes = GroupsGetByIdAction | GroupsGetByIdRequestAction | GroupsGetByIdRequestFailAction
  | GroupsGetByIdRequestSuccessAction | GroupsGetAction | GroupsGetRequestAction | GroupsGetRequestFailAction
  | GroupsGetRequestSuccessAction | GroupsUpdateAction | GroupsUpdateRequestAction | GroupsUpdateSuccessAction
  | GroupsUpdateRequestFailAction;
