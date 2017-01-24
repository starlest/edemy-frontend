import * as subjects from '../actions/subjects';
import {Subject} from '../models/subject';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
  entities: { [id: string]: Subject };
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
  entities: {}
};

export function reducer(state = initialState, action: subjects.Actions): State {
  switch (action.type) {
    case subjects.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case subjects.ActionTypes.LOAD_SUCCESS: {
      const lessons = action.payload;
      const lessonIds = lessons.map(lesson => String(lesson.Id));
      const lessonEntities = lessons.reduce(
        (entities: { [id: string]: Subject }, subject: Subject) => {
          return Object.assign(entities, {
            [subject.Id]: subject
          });
        }, {});

      return {
        loaded: true,
        loading: false,
        ids: lessonIds,
        entities: lessonEntities
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

