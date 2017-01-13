import {Action} from '@ngrx/store';
import {type} from '../util';

export const ActionTypes = {
  CHANGE_TITLE: type('[Layout] Change Title')
};

export class ChangeTitleAction implements Action {
  type = ActionTypes.CHANGE_TITLE;

  constructor(public payload: String) { }
}

export type Actions
  = ChangeTitleAction;
