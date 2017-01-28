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
import * as fromAuth from './auth';
import * as fromLessons from './lessons';
import * as fromLevels from './levels';
import * as fromSubjects from './subjects';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top Level state interface is just a map of keys to inner state types.
 */
export interface State {
  layout: fromLayout.State;
  auth: fromAuth.State;
  router: fromRouter.RouterState;
  lessons: fromLessons.State,
  levels: fromLevels.State,
  subjects: fromSubjects.State
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
  auth: fromAuth.reducer,
  router: fromRouter.routerReducer,
  levels: fromLevels.reducer,
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
 * Layout Reducers
 */
export const getLayoutState = (state: State) => state.layout;
export const getTitle = createSelector(getLayoutState, fromLayout.getTitle);
export const isSidenavLockedOpen = createSelector(getLayoutState,
  fromLayout.isSidenavLockedOpen);

/**
 * Auth Reducers
 */
export const getAuthState = (state: State) => state.auth;
export const getAuthEntity = createSelector(getAuthState, fromAuth.getEntity);
export const getAuthError = createSelector(getAuthState, fromAuth.getError);
export const getAuthLoaded = createSelector(getAuthState, fromAuth.getLoaded);
export const getAuthLoading = createSelector(getAuthState, fromAuth.getLoading);

/**
 * Lessons Reducers
 */
export const getLessonsState = (state: State) => state.lessons;
export const getLessons = createSelector(getLessonsState,
  fromLessons.getLessons);
export const getLessonsLoaded = createSelector(getLessonsState,
  fromLessons.getLoaded);
export const getLessonEntities = createSelector(getLessonsState,
  fromLessons.getEntities);
export const getSubjectLessons = (subject: string) => createSelector(getLessons,
  lessons => lessons.filter(lesson => lesson.Subject === subject));
export const getSelectedLesson = createSelector(getLessonsState,
  fromLessons.getSelected);


/**
 * Levels Reducers
 */
export const getLevelsState = (state: State) => state.levels;
export const getLevels = createSelector(getLevelsState, fromLevels.getAll);

/**
 * Subjects Reducers
 */
export const getSubjectsState = (state: State) => state.subjects;
export const getSubjects = createSelector(getSubjectsState,
  fromSubjects.getAll);
