import * as auth from '../actions/auth.actions';
import {AuthEntity} from '../models/auth-entity';


export interface State {
  entity: AuthEntity;
  error: any;
  loaded: boolean;
  loading: boolean;
}

const initialState: State = {
  entity: null,
  error: null,
  loaded: false,
  loading: false,
};

export function reducer(state = initialState, action: auth.Actions): State {
  switch (action.type) {
    case auth.ActionTypes.LOAD_FROM_SERVER:
      return Object.assign({}, state, {
        entity: null,
        error: null,
        loaded: false,
        loading: true
      });

    case auth.ActionTypes.REFRESH_SUCCESS:
    case auth.ActionTypes.LOAD_SUCCESS:
      return Object.assign({}, state, {
        entity: action.payload,
        loaded: true,
        loading: false
      });

    case auth.ActionTypes.LOAD_FAIL:
      return Object.assign({}, state, {
        error: action.payload,
        loaded: true,
        loading: false
      });

    case auth.ActionTypes.LOAD_NULL:
    case auth.ActionTypes.REMOVE_SUCCESS:
      return Object.assign({}, state, {
        entity: null,
        error: null,
        loaded: false,
        loading: false
      });
    default:
      return state;
  }
}

export const getEntity = (state: State) => state.entity;

export const getError = (state: State) => state.error;

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;
