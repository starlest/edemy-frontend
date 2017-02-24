import { createSelector } from 'reselect';
import { Student } from '../models';
import * as students from '../actions/students.action';

export interface State {
	loaded: boolean;
	loading: boolean;
	ids: string[];
	entities: { [id: string]: Student };
	selectedId: string;
	filter: (Student) => Student;
}

const initialState: State = {
	loaded: false,
	loading: false,
	ids: [],
	entities: {},
	selectedId: null,
	filter: student => student
};

export function reducer(state = initialState, action: students.Actions): State {
	switch (action.type) {
		case students.ActionTypes.LOAD: {
			return Object.assign({}, state, {
				loaded: false,
				loading: true,
				ids: [],
				entities: {},
				filter: student => student
			});
		}

		case students.ActionTypes.LOAD_SUCCESS: {
			const students = action.payload;
			const studentIds = students.map(student => String(student.Id));
			const studentEntities = students.reduce(
			  (entities: { [id: string]: Student }, student: Student) => {
				  return Object.assign(entities, {
					  [student.Id]: student
				  });
			  }, {});

			return Object.assign({}, state, {
				loaded: true,
				loading: false,
				ids: studentIds,
				entities: studentEntities,
				filter: student => student
			});
		}

		case students.ActionTypes.LOAD_FAIL:
			return Object.assign({}, state, {
				loaded: true,
				loading: false
			});

		case students.ActionTypes.SELECT: {
			return Object.assign({}, state, {
				selectedQuizId: action.payload
			});
		}

		case students.ActionTypes.SET_FILTER:
			return Object.assign({}, state, {
				filter: action.payload
			});

		case students.ActionTypes.REMOVE_FILTER:
			return Object.assign({}, state, {
				filter: student => student
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

export const getFilteredStudents = createSelector(getEntities, getIds, getFilter,
  (entities, ids, filter) => ids.map(id => entities[id]).filter(filter));



