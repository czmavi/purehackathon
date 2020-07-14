import { Company } from "../../../../common/model/company";

export const COMPANIES_GET_BY_ID = 'COMPANIES_GET_BY_ID';
export const COMPANIES_GET_BY_ID_REQUEST = 'COMPANIES_GET_BY_ID_REQUEST';
export const COMPANIES_GET_BY_ID_REQUEST_SUCCESS = 'COMPANIES_GET_BY_ID_REQUEST_SUCCESS';
export const COMPANIES_GET_BY_ID_REQUEST_FAIL = 'COMPANIES_GET_BY_ID_REQUEST_FAIL';
export const COMPANIES_GET = 'COMPANIES_GET';
export const COMPANIES_GET_REQUEST = 'COMPANIES_GET_REQUEST';
export const COMPANIES_GET_REQUEST_SUCCESS = 'COMPANIES_GET_REQUEST_SUCCESS';
export const COMPANIES_GET_REQUEST_FAIL = 'COMPANIES_GET_REQUEST_FAIL';

export interface CompaniesGetByIdAction {
  payload: {
    id: string,
  };
  type: typeof COMPANIES_GET_BY_ID;
}

export interface CompaniesGetByIdRequestAction {
  payload: {
    id: string,
  };
  type: typeof COMPANIES_GET_BY_ID_REQUEST;
}

export interface CompaniesGetByIdRequestSuccessAction {
  payload: {
    item: Company,
  };
  type: typeof COMPANIES_GET_BY_ID_REQUEST_SUCCESS;
}

export interface CompaniesGetByIdRequestFailAction {
  payload: {
    error: string,
  };
  type: typeof COMPANIES_GET_BY_ID_REQUEST_FAIL;
}

export interface CompaniesGetAction {
  payload: {
    page: number,
    size: number,
  };
  type: typeof COMPANIES_GET;
}

export interface CompaniesGetRequestAction {
  payload: {
    page: number,
    size: number,
  };
  type: typeof COMPANIES_GET_REQUEST;
}

export interface CompaniesGetRequestSuccessAction {
  payload: {
    items: Company[],
    page: number,
    total: number,
  };
  type: typeof COMPANIES_GET_REQUEST_SUCCESS;
}

export interface CompaniesGetRequestFailAction {
  payload: {
    error: string,
  };
  type: typeof COMPANIES_GET_REQUEST_FAIL;
}

export type ActionTypes = CompaniesGetByIdAction | CompaniesGetByIdRequestAction | CompaniesGetByIdRequestFailAction
  | CompaniesGetByIdRequestSuccessAction | CompaniesGetAction | CompaniesGetRequestAction | CompaniesGetRequestFailAction
  | CompaniesGetRequestSuccessAction;
