import * as subjects from '../actions/subjects.actions';
import { Subject } from '../models/subject';
import { createSelector } from 'reselect';

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
				loaded: false,
				loading: true,
				ids: [],
				entities: {}
			});
		}

		case subjects.ActionTypes.LOAD_SUCCESS: {
			const subjects = action.payload;
			const subjectIds = subjects.map(subject => String(subject.Id));
			const subjectEntities = subjects.reduce(
			  (entities: { [id: string]: Subject }, subject: Subject) => {
				  return Object.assign(entities, {
					  [subject.Id]: subject
				  });
			  }, {});

			return Object.assign({}, state, {
				loaded: true,
				loading: false,
				ids: subjectIds,
				entities: subjectEntities
			});
		}

		case subjects.ActionTypes.LOAD_FAIL: {
			return Object.assign({}, state, {
				loaded: true,
				loading: false
			})
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

export const getSubjects = createSelector(getEntities, getIds,
  (entities, ids) => ids.map(id => entities[id]));
