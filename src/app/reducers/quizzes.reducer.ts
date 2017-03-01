import * as quizzes from '../actions/quizzes.actions';
import { createSelector } from 'reselect';
import { Quiz } from '../models/quiz/quiz';

export interface State {
	loaded: boolean;
	loading: boolean;
	ids: string[];
	entities: { [id: string]: Quiz };
}

const initialState: State = {
	loaded: false,
	loading: false,
	ids: [],
	entities: {}
};

export function reducer(state = initialState, action: quizzes.Actions): State {
	switch (action.type) {
		case quizzes.ActionTypes.LOAD: {
			return Object.assign({}, state, {
				loaded: false,
				loading: true,
				ids: [],
				entities: {}
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
			});
		}

		case quizzes.ActionTypes.LOAD_FAIL:
			return Object.assign({}, state, {
				loaded: true,
				loading: false
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

export const getQuizzes = createSelector(getEntities, getIds,
  (entities, ids) => ids.map(id => entities[id]));

export const getQuiz = (Id: string) => createSelector(getEntities,
  entities => entities[Id]);


