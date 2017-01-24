import {createSelector} from 'reselect';
import * as fromRouter from '@ngrx/router-store';
import {environment} from '../../environments/environment';
/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More:
 * https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import {ActionReducer, combineReducers} from '@ngrx/store';
/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import {compose} from '@ngrx/core/compose';
/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import {storeFreeze} from 'ngrx-store-freeze';
/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromLayout from './layout';
import * as fromLessons from './lessons';
import * as fromSubjects from './subjects';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top Level state interface is just a map of keys to inner state types.
 */
export interface State {
  layout: fromLayout.State;
  router: fromRouter.RouterState;
  lessons: fromLessons.State,
  subjects: fromSubjects.State,
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top Level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  layout: fromLayout.reducer,
  router: fromRouter.routerReducer,
  lessons: fromLessons.reducer,
  subjects: fromSubjects.reducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze,
  combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production)
    return productionReducer(state, action);
  return developmentReducer(state, action);
}

/**
 * Lessons Reducers
 */
export const getLessonsState = (state: State) => state.lessons;
export const getLessonsLoaded = createSelector(getLessonsState,
  fromLessons.getLoaded);
export const getLessonsLoading = createSelector(getLessonsState,
  fromLessons.getLoading);
export const getLessonEntities = createSelector(getLessonsState,
  fromLessons.getEntities);
export const getLessonIds = createSelector(getLessonsState, fromLessons.getIds);
export const getFilter = createSelector(getLessonsState, fromLessons.getFilter);
export const getLessons = createSelector(getLessonEntities, getLessonIds,
  getFilter, (entities, ids, filter) => {
    return ids.map(id => entities[id]).filter(filter);
  });
export const getSubjectLessons = (subject: string) => createSelector(getLessons,
  lessons => {
    return lessons.filter(lesson => lesson.Subject === subject);
  });

/**
 * Subjects Reducers
 */
export const getSubjectsState = (state: State) => state.subjects;
export const getSubjectsLoaded = createSelector(getSubjectsState,
  fromSubjects.getLoaded);
export const getSubjectsLoading = createSelector(getSubjectsState,
  fromSubjects.getLoading);
export const getSubjectEntities = createSelector(getSubjectsState,
  fromSubjects.getEntities);
export const getSubjectIds = createSelector(getSubjectsState,
  fromSubjects.getIds);
export const getSubjects = createSelector(getSubjectEntities, getSubjectIds,
  (entities, ids) => ids.map(id => entities[id]));

/**
 * Layout Reducers
 */
export const getLayoutState = (state: State) => state.layout;
export const getTitle = createSelector(getLayoutState, fromLayout.getTitle);
export const isSidenavLockedOpen = createSelector(getLayoutState,
  fromLayout.isSidenavLockedOpen);
