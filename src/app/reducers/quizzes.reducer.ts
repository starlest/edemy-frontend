import * as quizzes from '../actions/quizzes.actions';
import { createSelector } from 'reselect';
import { Quiz } from '../models/quiz/quiz';

export interface State {
	loaded: boolean;
	loading: boolean;
	ids: string[];
	entities: { [id: string]: Quiz };
	selectedQuizId: string;
	filter: (Quiz) => Quiz;
}

const initialState: State = {
	loaded: false,
	loading: false,
	ids: [],
	entities: {},
	selectedQuizId: null,
	filter: quiz => quiz
};

export function reducer(state = initialState, action: quizzes.Actions): State {
	switch (action.type) {
		case quizzes.ActionTypes.LOAD: {
			return Object.assign({}, state, {
				loaded: false,
				loading: true,
				ids: [],
				entities: {},
				filter: quiz => quiz
			});
		}

		case quizzes.ActionTypes.LOAD_SUCCESS: {
			const quizzes = action.payload;
			const quizIds = quizzes.map(lesson => String(lesson.Id));
			const quizEntities = quizzes.reduce(
			  (entities: { [id: string]: Quiz }, quiz: Quiz) => {
				  return Object.assign(entities, {
					  [quiz.Id]: quiz
				  });
			  }, {});

			return Object.assign({}, state, {
				loaded: true,
				loading: false,
				ids: quizIds,
				entities: quizEntities,
				filter: quiz => quiz
			});
		}

		case quizzes.ActionTypes.LOAD_FAIL:
			return Object.assign({}, state, {
				loaded: true,
				loading: false
			});

		case quizzes.ActionTypes.SELECT: {
			return Object.assign({}, state, {
				selectedQuizId: action.payload
			});
		}

		case quizzes.ActionTypes.SET_FILTER:
			return Object.assign({}, state, {
				filter: action.payload
			});

		case quizzes.ActionTypes.REMOVE_FILTER:
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

export const getSelectedId = (state: State) => state.selectedQuizId;

export const getSelected = createSelector(getEntities, getSelectedId,
  (entities, selectedId) => {
	  return entities[selectedId];
  });

export const getFilteredQuizzes = createSelector(getEntities, getIds, getFilter,
  (entities, ids, filter) => ids.map(id => entities[id]).filter(filter));



