import * as lessons from '../actions/lessons';
import {Lesson} from '../models/lesson';

export interface State {
  loaded: boolean;
  loading: boolean;
  lessons: Lesson[];
};

const initialState: State = {
  loaded: false,
  loading: false,
  lessons: []
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

      return {
        loaded: true,
        loading: false,
        lessons: lessons
      };
    }

    default: {
      return state;
    }
  }
}


export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getLessons = (state: State) => state.lessons;
