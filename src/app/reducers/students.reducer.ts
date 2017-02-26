import { createSelector } from 'reselect';
import { Student } from '../models';
import * as students from '../actions/students.action';

export interface State {
	loaded: boolean;
	loading: boolean;
	ids: string[];
	entities: { [id: string]: Student };
}

const initialState: State = {
	loaded: false,
	loading: false,
	ids: [],
	entities: {}
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

		case students.ActionTypes.ADD_SUCCESS:
			const student = action.payload;
			return Object.assign({}, state, {
				ids: [...state.ids, student.Id],
				entities: Object.assign({}, state.entities, {
					[student.Id]: student
				})
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

export const getStudent = (Id: string) => createSelector(getEntities,
  entities => entities[Id]);

export const getStudents = createSelector(getEntities, getIds,
  (entities, ids,) => ids.map(id => entities[id]));



