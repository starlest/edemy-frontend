import * as lessons from '../actions/lessons';
import {Lesson} from '../models/lesson';
import { createSelector } from 'reselect';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
  entities: { [id: string]: Lesson };
  filter: (Lesson) => Lesson;
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
  entities: {},
  filter: lesson => lesson
};

export function reducer(state = initialState, action: lessons.Actions): State {
  switch (action.type) {
    case lessons.ActionTypes.LOAD: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case lessons.ActionTypes.LOAD_SUCCESS: {
      const lessons = action.payload;
      const lessonIds = lessons.map(lesson => String(lesson.id));
      const lessonEntities = lessons.reduce(
        (entities: { [id: string]: Lesson }, lesson: Lesson) => {
          return Object.assign(entities, {
            [lesson.id]: lesson
          });
        }, {});

      return {
        loaded: true,
        loading: false,
        ids: lessonIds,
        entities: lessonEntities,
        filter: lesson => lesson
      };
    }

    case lessons.ActionTypes.SET_FILTER:
      return Object.assign({}, state, {
        filter: action.payload
      });

    case lessons.ActionTypes.REMOVE_FILTER:
      return Object.assign({}, state, {
        filter: lesson => lesson
      });

    default: {
      return state;
    }
  }
}


export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;

export const getEntities = (state: State) => state.entities;

export const getFilter = (state: State) => state.filter;

