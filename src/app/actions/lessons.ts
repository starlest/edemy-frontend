import {Action} from '@ngrx/store';
import {type} from './util';
import {Lesson} from '../models/lesson';

export const ActionTypes = {
  LOAD: type('[Lessons] Load'),
  LOAD_SUCCESS: type('[Lessons] Load Success'),
  LOAD_FAIL: type('[Lessons] Load Fail'),
  SELECT: type('[Lessons] Select'),
  SET_FILTER: type('[Lessons] Set Filter'),
  REMOVE_FILTER: type('[Lessons] Remove Filter')
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Lesson[]) {
  }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;

  constructor(public payload: any) {
  }
}

export class SelectAction implements Action {
  type = ActionTypes.SELECT;

  constructor(public payload: string) {
  }
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
  SelectAction |
  SetFilter |
  RemoveFilter;
