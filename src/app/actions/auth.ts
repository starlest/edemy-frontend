import {Action} from '@ngrx/store';
import {type} from './util';

export const ActionTypes = {
  LOAD_FROM_SERVER: type('[Auth] Load From Server'),
  LOAD_FROM_LOCAL_STORAGE: type('[Auth] Load From Local Storage'),
  LOAD_SUCCESS: type('[Auth] Load Success'),
  LOAD_FAIL: type('[Auth] Load Fail'),
  LOAD_NULL: type('[Auth] Load Null'),
  SET: type('[Auth] Set'),
  REMOVE: type('[Auth] Remove'),
  REMOVE_SUCCESS: type('[Auth] Remove Success'),
  REMOVE_FAIL: type('[Auth] Remove Fail')
};

export class LoadFromServerAction implements Action {
  type = ActionTypes.LOAD_FROM_SERVER;

  constructor(public payload: any) {
  }
}

export class LoadFromLocalStorageAction implements Action {
  type = ActionTypes.LOAD_FROM_LOCAL_STORAGE;
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: any) {
  }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadNullAction implements Action {
  type = ActionTypes.LOAD_NULL;
}

export class SetAction implements Action {
  type = ActionTypes.SET;

  constructor(public payload: any) {
  }
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

export type Actions = LoadFromServerAction
  | LoadFromLocalStorageAction
  | LoadSuccessAction
  | LoadFailAction
  | LoadNullAction
  | SetAction
  | RemoveAction
  | RemoveSuccessAction
  | RemoveFailAction;

