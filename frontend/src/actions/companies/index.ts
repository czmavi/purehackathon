import {
  COMPANIES_GET_BY_ID,
  COMPANIES_GET_BY_ID_REQUEST,
  COMPANIES_GET_BY_ID_REQUEST_FAIL,
  COMPANIES_GET_BY_ID_REQUEST_SUCCESS,
  COMPANIES_GET,
  COMPANIES_GET_REQUEST,
  COMPANIES_GET_REQUEST_FAIL,
  COMPANIES_GET_REQUEST_SUCCESS,
  ActionTypes,
} from './types';
import { Company } from '../../../../common/model/company';

export const companiesGetByIdAction = (id: string): ActionTypes => ({
  payload: {
    id,
  },
  type: COMPANIES_GET_BY_ID,
});

export const companiesGetByIdRequestAction = (id: string): ActionTypes => ({
  payload: {
    id,
  },
  type: COMPANIES_GET_BY_ID_REQUEST,
});

export const companiesGetByIdRequestFailAction = (error: string): ActionTypes => ({
  payload: {
    error,
  },
  type: COMPANIES_GET_BY_ID_REQUEST_FAIL,
});

export const companiesGetByIdRequestSuccessAction = (item: Company): ActionTypes => ({
  payload: {
    item,
  },
  type: COMPANIES_GET_BY_ID_REQUEST_SUCCESS,
});

export const companiesGetAction = (page: number, size: number): ActionTypes => ({
  payload: {
    page,
    size,
  },
  type: COMPANIES_GET,
});

export const companiesGetRequestAction = (page: number, size: number): ActionTypes => ({
  payload: {
    page,
    size,
  },
  type: COMPANIES_GET_REQUEST,
});

export const companiesGetRequestFailAction = (error: string): ActionTypes => ({
  payload: {
    error,
  },
  type: COMPANIES_GET_REQUEST_FAIL,
});

export const companiesGetRequestSuccessAction = (items: Company[], page: number, total: number): ActionTypes => ({
  payload: {
    items,
    page,
    total,
  },
  type: COMPANIES_GET_REQUEST_SUCCESS,
});
