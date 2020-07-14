import { SearchableState } from './types';
import {
  COMPANIES_GET_BY_ID_REQUEST,
  COMPANIES_GET_BY_ID_REQUEST_FAIL,
  COMPANIES_GET_BY_ID_REQUEST_SUCCESS,
  COMPANIES_GET_REQUEST,
  COMPANIES_GET_REQUEST_FAIL,
  COMPANIES_GET_REQUEST_SUCCESS,
  ActionTypes,
} from '../actions/companies/types';
import { Company } from '../../../common/model/company';

const initialState: SearchableState<Company> = {
  error: null,
  fetching: false,
  items: {},
  pages: {},
  total: null,
};

const reducer = (state = initialState, action: ActionTypes): SearchableState<Company> => {
  switch (action.type) {
    case COMPANIES_GET_BY_ID_REQUEST: return { ...state, error: null, fetching: true };
    case COMPANIES_GET_BY_ID_REQUEST_FAIL: return { ...state, fetching: false, error: action.payload.error };
    case COMPANIES_GET_BY_ID_REQUEST_SUCCESS: return {
      ...state,
      error: null,
      fetching: false,
      items: {
        ...state.items,
        [action.payload.item._id]: action.payload.item,
      },
    };
    case COMPANIES_GET_REQUEST: return { ...state, error: null, fetching: true };
    case COMPANIES_GET_REQUEST_FAIL: return { ...state, fetching: false, error: action.payload.error };
    case COMPANIES_GET_REQUEST_SUCCESS: {
      return {
        ...state,
        error: null,
        fetching: false,
        items: {
          ...state.items,
          ...action.payload.items.reduce((acc: any, user) => ({
            ...acc,
            [user._id]: user,
          }), {}),
        },
        pages: {
          ...state.pages,
          [action.payload.page]: { items: action.payload.items, total: action.payload.total },
        },
        total: action.payload.total,
      };
    }
    default: return state;
  }
};

export default reducer;
