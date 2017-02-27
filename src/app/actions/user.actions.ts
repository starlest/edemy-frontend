import { Action } from '@ngrx/store';
import { type } from './util';
import { User } from '../models/user';

export const ActionTypes = {
	LOAD: type('[User] Load'),
	LOAD_SUCCESS: type('[User] Load Success'),
	LOAD_FAIL: type('[User] Load Fail'),
	STARTUP_LOAD_FAIL: type('[User] Startup Load Fail'),
	REMOVE: type('[User] Remove'),
	REMOVE_SUCCESS: type('[User] Remove Success'),
	REMOVE_FAIL: type('[User] Remove Fail'),
	DO_NOTHING: type('[User] Do Nothing'),
};

export class LoadAction implements Action {
	type = ActionTypes.LOAD;
}

export class LoadSuccessAction implements Action {
	type = ActionTypes.LOAD_SUCCESS;

	constructor(public payload: User) {
	}
}

export class LoadFailAction implements Action {
	type = ActionTypes.LOAD_FAIL;
}

export class StartupLoadFailAction implements Action {
	type = ActionTypes.STARTUP_LOAD_FAIL;
}


export class RemoveAction implements Action {
	type = ActionTypes.REMOVE;
}

export class RemoveSuccessAction implements Action {
	type = ActionTypes.REMOVE_SUCCESS;
}

export class RemoveFailAction implements Action {
	type = ActionTypes.REMOVE_FAIL;
}

export class DoNothingAction implements Action {
	type = ActionTypes.DO_NOTHING;
}

export type Actions = LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | StartupLoadFailAction
  | RemoveAction
  | RemoveSuccessAction
  | RemoveFailAction
  | DoNothingAction;
