import {Action} from '@ngrx/store';
import {type} from './util';

export const ActionTypes = {
  CHANGE_TITLE: type('[Layout] Change Title'),
  ON_LOCKED_OPEN_SIDENAV: type('[Layout] On Locked Open Sidenav'),
  OFF_UNLOCKED_OPEN_SIDENAV: type('[Layout] Off Locked Open Sidenav')
};

export class ChangeTitleAction implements Action {
  type = ActionTypes.CHANGE_TITLE;

  constructor(public payload: String) {
  }
}

export class OnLockedOpenSidenavAction implements Action {
  type = ActionTypes.ON_LOCKED_OPEN_SIDENAV;
}

export class OffLockedOpenSidenavAction implements Action {
  type = ActionTypes.OFF_UNLOCKED_OPEN_SIDENAV;
}

export type Actions = ChangeTitleAction
  | OnLockedOpenSidenavAction
  | OffLockedOpenSidenavAction;
