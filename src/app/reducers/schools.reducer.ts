import { School } from '../models';
import { createSelector } from 'reselect';
import * as schools from '../actions/schools.actions';

export interface State {
	loaded: boolean;
	loading: boolean;
	ids: string[];
	entities: { [id: string]: School };
}

const initialState: State = {
	loaded: false,
	loading: false,
	ids: [],
	entities: {}
};

export function reducer(state = initialState, action: schools.Actions): State {
	switch (action.type) {
		case schools.ActionTypes.LOAD: {
			return Object.assign({}, state, {
				loaded: false,
				loading: true,
				ids: [],
				entities: {}
			});
		}

		case schools.ActionTypes.LOAD_SUCCESS: {
			const schools = action.payload;
			const schoolIds = schools.map(school => String(school.Id));
			const schoolEntities = schools.reduce(
			  (entities: { [id: string]: School }, school: School) => {
				  return Object.assign(entities, {
					  [school.Id]: school
				  });
			  }, {});

			return Object.assign({}, state, {
				loaded: true,
				loading: false,
				ids: schoolIds,
				entities: schoolEntities
			});
		}

		case schools.ActionTypes.LOAD_FAIL: {
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

export const getSchools = createSelector(getEntities, getIds,
  (entities, ids) => ids.map(id => entities[id]));
