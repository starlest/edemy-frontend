import * as levels from '../actions/levels.actions';
import {Level} from '../models/level';
import {createSelector} from 'reselect';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
  entities: { [id: string]: Level };
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
  entities: {}
};

export function reducer(state = initialState, action: levels.Actions): State {
  switch (action.type) {
    case levels.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case levels.ActionTypes.LOAD_SUCCESS: {
      const levels = action.payload;
      const levelIds = levels.map(level => String(level.Id));
      const levelEntities = levels.reduce(
        (entities: { [id: string]: Level }, level: Level) => {
          return Object.assign(entities, {
            [level.Id]: level
          });
        }, {});

      return {
        loaded: true,
        loading: false,
        ids: levelIds,
        entities: levelEntities
      };
    }

    default: {
      return state;
    }
  }
}


export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;

export const getEntities = (state: State) => state.entities;

export const getLevels = createSelector(getEntities, getIds,
  (entities, ids) => ids.map(id => entities[id]));
