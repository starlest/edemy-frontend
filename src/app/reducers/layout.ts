import * as layout from '../actions/layout';


export interface State {
  title: String;
}

const initialState: State = {
  title: "",
};

export function reducer(state = initialState, action: layout.Actions): State {
  switch (action.type) {
    case layout.ActionTypes.CHANGE_TITLE:
      return {
        title: action.payload
      };

    default:
      return state;
  }
}

export const getTitle = (state: State) => state.title;
