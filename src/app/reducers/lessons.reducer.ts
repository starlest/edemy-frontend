import * as lessons from '../actions/lessons.actions';
import { Lesson } from '../models/lesson';
import { createSelector } from 'reselect';

export interface State {
	loaded: boolean;
	loading: boolean;
	ids: string[];
	entities: { [id: string]: Lesson };
	selectedId: string;
	filter: (Lesson) => Lesson;
}

const initialState: State = {
	loaded: false,
	loading: false,
	ids: [],
	entities: {},
	selectedId: null,
	filter: lesson => lesson
};

export function reducer(state = initialState, action: lessons.Actions): State {
	switch (action.type) {
		case lessons.ActionTypes.LOAD: {
			return Object.assign({}, state, {
				loaded: false,
				loading: true,
				ids: [],
				entities: {},
				filter: lesson => lesson
			});
		}

		case lessons.ActionTypes.LOAD_SUCCESS: {
			const lessons = action.payload;
			const lessonIds = lessons.map(lesson => String(lesson.Id));
			const lessonEntities = lessons.reduce(
			  (entities: { [id: string]: Lesson }, lesson: Lesson) => {
				  return Object.assign(entities, {
					  [lesson.Id]: lesson
				  });
			  }, {});

			return Object.assign({}, state, {
				loaded: true,
				loading: false,
				ids: lessonIds,
				entities: lessonEntities
			});
		}

		case lessons.ActionTypes.LOAD_FAIL:
			return Object.assign({}, state, {
				loaded: true,
				loading: false
			});

		case lessons.ActionTypes.SELECT: {
			return Object.assign({}, state, {
				selectedId: action.payload
			});
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

export const getFilter = (state: State) => state.filter;

export const getIds = (state: State) => state.ids;

export const getEntities = (state: State) => state.entities;

export const getSelectedId = (state: State) => state.selectedId;

export const getSelected = createSelector(getEntities, getSelectedId,
  (entities, selectedId) => {
	  return entities[selectedId];
  });

export const getFilteredLessons = createSelector(getEntities, getIds, getFilter,
  (entities, ids, filter) => ids.map(id => entities[id]).filter(filter));



