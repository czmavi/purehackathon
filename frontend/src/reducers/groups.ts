import { SearchableState } from './types';
import {
  GROUPS_GET_BY_ID_REQUEST,
  GROUPS_GET_BY_ID_REQUEST_FAIL,
  GROUPS_GET_BY_ID_REQUEST_SUCCESS,
  GROUPS_GET_REQUEST,
  GROUPS_GET_REQUEST_FAIL,
  GROUPS_GET_REQUEST_SUCCESS,
  ActionTypes,
  GROUPS_UPDATE_REQUEST,
  GROUPS_UPDATE_REQUEST_FAIL,
  GROUPS_UPDATE_REQUEST_SUCCESS,
} from '../actions/groups/types';
import { Group } from '../../../common/model/group';

const initialState: SearchableState<Group> = {
  error: null,
  fetching: false,
  items: {},
  pages: {},
  total: null,
};

const reducer = (state = initialState, action: ActionTypes): SearchableState<Group> => {
  switch (action.type) {
    case GROUPS_GET_BY_ID_REQUEST: return { ...state, error: null, fetching: true };
    case GROUPS_GET_BY_ID_REQUEST_FAIL: return { ...state, fetching: false, error: action.payload.error };
    case GROUPS_GET_BY_ID_REQUEST_SUCCESS: return {
      ...state,
      error: null,
      fetching: false,
      items: {
        ...state.items,
        [action.payload.item._id]: action.payload.item,
      },
    };
    case GROUPS_UPDATE_REQUEST: return { ...state, error: null, fetching: true };
    case GROUPS_UPDATE_REQUEST_FAIL: return { ...state, fetching: false, error: action.payload.error };
    case GROUPS_UPDATE_REQUEST_SUCCESS: return {
      ...state,
      error: null,
      fetching: false,
      items: {
        ...state.items,
        [action.payload.item._id]: action.payload.item,
      },
    };
    case GROUPS_GET_REQUEST: return { ...state, error: null, fetching: true };
    case GROUPS_GET_REQUEST_FAIL: return { ...state, fetching: false, error: action.payload.error };
    case GROUPS_GET_REQUEST_SUCCESS: {
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
