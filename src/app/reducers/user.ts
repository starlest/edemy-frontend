import * as user from '../actions/user';
import {AuthEntity} from '../models/auth-entity';
import {User} from '../models/user';


export interface State {
  entity: User;
  loaded: boolean;
  loading: boolean;
}

const initialState: State = {
  entity: null,
  loaded: false,
  loading: false,
};

export function reducer(state = initialState, action: user.Actions): State {
  switch (action.type) {
    case user.ActionTypes.LOAD:
      return Object.assign({}, state, {
        entity: null,
        loaded: false,
        loading: true
      });

    case user.ActionTypes.LOAD_SUCCESS:
      return Object.assign({}, state, {
        entity: action.payload,
        loaded: true,
        loading: false
      });

    default:
      return state;
  }
}

export const getEntity = (state: State) => state.entity;

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;
