import * as layout from '../actions/layout';


export interface State {
  title: String;
  isSidenavLockedOpen: boolean;
}

const initialState: State = {
  title: "",
  isSidenavLockedOpen: true
};

export function reducer(state = initialState, action: layout.Actions): State {
  switch (action.type) {
    case layout.ActionTypes.CHANGE_TITLE:
      return Object.assign({}, state, {
        title: action.payload
      });
    case layout.ActionTypes.ON_LOCKED_OPEN_SIDENAV:
      return Object.assign({}, state, {
        isSidenavLockedOpen: true
      });
    case layout.ActionTypes.OFF_UNLOCKED_OPEN_SIDENAV:
      return Object.assign({}, state, {
        isSidenavLockedOpen: false
      });
    default:
      return state;
  }
}

export const getTitle = (state: State) => state.title;
export const isSidenavLockedOpen = (state: State) => state.isSidenavLockedOpen;
