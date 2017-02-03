import {Action} from '@ngrx/store';
import {type} from './util';
import {Subject} from '../models/subject';

export const ActionTypes = {
  LOAD: type('[Subjects] Load'),
  LOAD_SUCCESS: type('[Subjects] Load Success'),
  LOAD_FAIL: type('[Subjects] Load Fail')
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Subject[]) {
  }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any) {
  }
}

export type Actions = LoadAction |
  LoadSuccessAction |
  LoadFailAction;
