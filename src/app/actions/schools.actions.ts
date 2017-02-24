import {Action} from '@ngrx/store';
import {type} from './util';
import {School} from '../models';

export const ActionTypes = {
	LOAD: type('[Schools] Load'),
	LOAD_SUCCESS: type('[Schools] Load Success'),
	LOAD_FAIL: type('[Schools] Load Fail')
};

export class LoadAction implements Action {
	type = ActionTypes.LOAD;
}

export class LoadSuccessAction implements Action {
	type = ActionTypes.LOAD_SUCCESS;

	constructor(public payload: School[]) {
	}
}

export class LoadFailAction implements Action {
	type = ActionTypes.LOAD_FAIL;
}

export type Actions = LoadAction |
  LoadSuccessAction |
  LoadFailAction;
