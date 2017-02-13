import * as worksheets from '../actions/worksheets.actions';
import { Worksheet } from '../models/worksheet';
import { createSelector } from 'reselect';

export interface State {
	loaded: boolean;
	loading: boolean;
	ids: string[];
	entities: { [id: string]: Worksheet };
	filter: (Worksheet) => Worksheet;
}

const initialState: State = {
	loaded: false,
	loading: false,
	ids: [],
	entities: null,
	filter: worksheet => worksheet
};

export function reducer(state = initialState,
                        action: worksheets.Actions): State {
	switch (action.type) {
		case worksheets.ActionTypes.LOAD: {
			return Object.assign({}, state, {
				loading: true,
				loaded: false,
				ids: [],
				entities: null,
				filter: worksheet => worksheet
			});
		}

		case worksheets.ActionTypes.LOAD_SUCCESS: {
			const worksheets = action.payload;
			const worksheetIds = worksheets.map(lesson => String(lesson.Id));
			const worksheetEntities = worksheets.reduce(
			  (entities: { [id: string]: Worksheet }, worksheet: Worksheet) => {
				  return Object.assign(entities, {
					  [worksheet.Id]: worksheet
				  });
			  }, {});

			return Object.assign({}, state, {
				loaded: true,
				loading: false,
				ids: worksheetIds,
				entities: worksheetEntities
			});
		}

		case worksheets.ActionTypes.LOAD_FAIL:
			return Object.assign({}, state, {
				loaded: true,
				loading: false
			});

		case worksheets.ActionTypes.SET_FILTER:
			return Object.assign({}, state, {
				filter: action.payload
			});

		case worksheets.ActionTypes.REMOVE_FILTER:
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

export const getFilteredWorksheets = createSelector(getEntities, getIds,
  getFilter,
  (entities, ids, filter) => {
	  return ids.map(id => entities[id]).filter(filter);
  });



