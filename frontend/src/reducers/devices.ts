import { SearchableState } from './types';
import {
  DEVICES_GET_BY_ID_REQUEST,
  DEVICES_GET_BY_ID_REQUEST_FAIL,
  DEVICES_GET_BY_ID_REQUEST_SUCCESS,
  DEVICES_GET_REQUEST,
  DEVICES_GET_REQUEST_FAIL,
  DEVICES_GET_REQUEST_SUCCESS,
  ActionTypes,
} from '../actions/devices/types';
import { Device } from '../../../common/model/device';

const initialState: SearchableState<Device> = {
  error: null,
  fetching: false,
  items: {},
  pages: {},
  total: null,
};

const reducer = (state = initialState, action: ActionTypes): SearchableState<Device> => {
  switch (action.type) {
    case DEVICES_GET_BY_ID_REQUEST: return { ...state, error: null, fetching: true };
    case DEVICES_GET_BY_ID_REQUEST_FAIL: return { ...state, fetching: false, error: action.payload.error };
    case DEVICES_GET_BY_ID_REQUEST_SUCCESS: return {
      ...state,
      error: null,
      fetching: false,
      items: {
        ...state.items,
        [action.payload.item._id]: action.payload.item,
      },
    };
    case DEVICES_GET_REQUEST: return { ...state, error: null, fetching: true };
    case DEVICES_GET_REQUEST_FAIL: return { ...state, fetching: false, error: action.payload.error };
    case DEVICES_GET_REQUEST_SUCCESS: {
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
