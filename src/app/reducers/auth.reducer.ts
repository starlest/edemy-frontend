import * as auth from '../actions/auth.actions';
import { AuthEntity } from '../models/auth-entity';


export interface State {
	entity: AuthEntity;
	loaded: boolean;
	loading: boolean;
}

const initialState: State = {
	entity: null,
	loaded: false,
	loading: false,
};

export function reducer(state = initialState, action: auth.Actions): State {
	switch (action.type) {

		case auth.ActionTypes.LOAD_FROM_LOCAL_STORAGE:
		case auth.ActionTypes.LOAD_FROM_SERVER:
			return Object.assign({}, state, {
				entity: null,
				loaded: false,
				loading: true
			});

		case auth.ActionTypes.REFRESH_SUCCESS:
		case auth.ActionTypes.LOAD_SUCCESS:
			return Object.assign({}, state, {
				entity: action.payload,
				loaded: true,
				loading: false
			});

		case auth.ActionTypes.LOAD_FAIL:
			return Object.assign({}, state, {
				loaded: true,
				loading: false
			});

		case auth.ActionTypes.REFRESH:
			return Object.assign({}, state, {
				loaded: false,
				loading: true
			});

		case auth.ActionTypes.REMOVE_FAIL:
		case auth.ActionTypes.REMOVE_SUCCESS:
			return Object.assign({}, state, {
				entity: null,
				loaded: false,
				loading: false
			});
		default:
			return state;
	}
}

export const getEntity = (state: State) => state.entity;

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;
