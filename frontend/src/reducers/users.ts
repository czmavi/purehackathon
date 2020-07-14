import { SearchableState } from './types';
import {
  USERS_GET_BY_ID_REQUEST,
  USERS_GET_BY_ID_REQUEST_FAIL,
  USERS_GET_BY_ID_REQUEST_SUCCESS,
  USERS_GET_REQUEST,
  USERS_GET_REQUEST_FAIL,
  USERS_GET_REQUEST_SUCCESS,
  ActionTypes,
} from '../actions/users/types';
import { User } from '../../../common/model/user';

const initialState: SearchableState<User> = {
  error: null,
  fetching: false,
  items: {},
  pages: {},
  total: null,
};

const reducer = (state = initialState, action: ActionTypes): SearchableState<User> => {
  switch (action.type) {
    case USERS_GET_BY_ID_REQUEST: return { ...state, error: null, fetching: true };
    case USERS_GET_BY_ID_REQUEST_FAIL: return { ...state, fetching: false, error: action.payload.error };
    case USERS_GET_BY_ID_REQUEST_SUCCESS: return {
      ...state,
      error: null,
      fetching: false,
      items: {
        ...state.items,
        [action.payload.item._id]: action.payload.item,
      },
    };
    case USERS_GET_REQUEST: return { ...state, error: null, fetching: true };
    case USERS_GET_REQUEST_FAIL: return { ...state, fetching: false, error: action.payload.error };
    case USERS_GET_REQUEST_SUCCESS: {
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
