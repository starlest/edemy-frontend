import {Action} from '@ngrx/store';
import {type} from './util';
import {Lesson} from '../models/lesson';

export const ActionTypes = {
  LOAD: type('[Lessons] Load'),
  LOAD_SUCCESS: type('[Lessons] Load Success'),
  LOAD_FAIL: type('[Lessons] Load Fail')
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Lesson[]) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any) { }
}

export type Actions = LoadAction |
  LoadSuccessAction |
  LoadFailAction;
