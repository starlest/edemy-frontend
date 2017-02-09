import { Action } from '@ngrx/store';
import { type } from './util';
import { Worksheet } from '../models/worksheet';

export const ActionTypes = {
	LOAD: type('[Worksheets] Load'),
	LOAD_SUCCESS: type('[Worksheets] Load Success'),
	LOAD_FAIL: type('[Worksheets] Load Fail'),
	SET_FILTER: type('[Worksheets] Set Filter'),
	REMOVE_FILTER: type('[Worksheets] Remove Filter')
};

export class LoadAction implements Action {
	type = ActionTypes.LOAD;
}

export class LoadSuccessAction implements Action {
	type = ActionTypes.LOAD_SUCCESS;

	constructor(public payload: Worksheet[]) {
	}
}

export class LoadFailAction implements Action {
	type = ActionTypes.LOAD_FAIL;
}

export class SetFilter implements Action {
	type = ActionTypes.SET_FILTER;

	constructor(public payload: any) {
	}
}
export class RemoveFilter implements Action {
	type = ActionTypes.REMOVE_FILTER;
}

export type Actions = LoadAction |
  LoadSuccessAction |
  LoadFailAction |
  SetFilter |
  RemoveFilter;
