import {Action} from '@ngrx/store';
import {type} from './util';
import {Level} from '../models/level';

export const ActionTypes = {
  LOAD: type('[Levels] Load'),
  LOAD_SUCCESS: type('[Levels] Load Success'),
  LOAD_FAIL: type('[Levels] Load Fail')
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Level[]) {
  }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;
}

export type Actions = LoadAction |
  LoadSuccessAction |
  LoadFailAction;
