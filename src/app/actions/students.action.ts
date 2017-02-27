import { Action } from '@ngrx/store';
import { type } from './util';
import { Student } from '../models';

export const ActionTypes = {
	LOAD: type('[Students] Load'),
	LOAD_SUCCESS: type('[Students] Load Success'),
	LOAD_FAIL: type('[Students] Load Fail'),
	ADD: type('[Students] Add'),
	ADD_SUCCESS: type('[Students] Add Success'),
	ADD_FAIL: type('[Students] Add Fail'),
	EDIT: type('[Students] Edit'),
	EDIT_SUCCESS: type('[Students] Edit Success'),
	EDIT_FAIL: type('[Students] Edit Fail')
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

export class EditAction implements Action {
	type = ActionTypes.EDIT;

	constructor(public payload: Student) {
	}
}

export class EditSuccessAction implements Action {
	type = ActionTypes.EDIT_SUCCESS;

	constructor(public payload: Student) {
	}
}

export class EditFailAction implements Action {
	type = ActionTypes.EDIT_FAIL;
}


export type Actions = LoadAction |
  LoadSuccessAction |
  LoadFailAction |
  AddAction |
  AddSuccessAction |
  AddFailAction |
  EditAction |
  EditSuccessAction |
  EditFailAction;
