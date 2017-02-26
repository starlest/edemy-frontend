import { Action } from '@ngrx/store';
import { type } from './util';
import { Student } from '../models';

export const ActionTypes = {
	LOAD: type('[Students] Load'),
	LOAD_SUCCESS: type('[Students] Load Success'),
	LOAD_FAIL: type('[Students] Load Fail'),
	ADD: type('[Students] Add'),
	ADD_SUCCESS: type('[Students] Add Success'),
	ADD_FAIL: type('[Students] Add Fail')
};

export class LoadAction implements Action {
	type = ActionTypes.LOAD;
}

export class LoadSuccessAction implements Action {
	type = ActionTypes.LOAD_SUCCESS;

	constructor(public payload: Student[]) {
	}
}

export class LoadFailAction implements Action {
	type = ActionTypes.LOAD_FAIL;
}

export class AddAction implements Action {
	type = ActionTypes.ADD;

	constructor(public payload: Student) {
	}
}

export class AddSuccessAction implements Action {
	type = ActionTypes.ADD_SUCCESS;

	constructor(public payload: Student) {
	}
}

export class AddFailAction implements Action {
	type = ActionTypes.ADD_FAIL;
}


export type Actions = LoadAction |
  LoadSuccessAction |
  LoadFailAction |
  AddAction |
  AddSuccessAction |
  AddFailAction;
