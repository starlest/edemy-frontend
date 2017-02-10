import { createSelector } from 'reselect';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from './auth.reducer';
import * as fromLayout from './layout.reducer';
import * as fromLevels from './levels.reducer';
import * as fromLessons from './lessons.reducer';
import * as fromRouter from '@ngrx/router-store';
import * as fromSubjects from './subjects.reducer';
import * as fromUser from './user-reducer';
import * as fromWorksheets from './worksheets.reducer';

export interface State {
	layout: fromLayout.State;
	auth: fromAuth.State;
	user: fromUser.State;
	router: fromRouter.RouterState;
	levels: fromLevels.State;
	subjects: fromSubjects.State;
	lessons: fromLessons.State;
	worksheets: fromWorksheets.State;
}

const reducers = {
	layout: fromLayout.reducer,
	auth: fromAuth.reducer,
	user: fromUser.reducer,
	router: fromRouter.routerReducer,
	levels: fromLevels.reducer,
	lessons: fromLessons.reducer,
	subjects: fromSubjects.reducer,
	worksheets: fromWorksheets.reducer
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
export const getAuthLoaded = createSelector(getAuthState, fromAuth.getLoaded);
export const getAuthLoading = createSelector(getAuthState, fromAuth.getLoading);

/**
 * User Reducers
 */
export const getUserState = (state: State) => state.user;
export const getUserEntity = createSelector(getUserState, fromUser.getEntity);
export const getUserLoaded = createSelector(getUserState, fromUser.getLoaded);


/**
 * Subjects Reducers
 */
export const getSubjectsState = (state: State) => state.subjects;
export const getSubjects = createSelector(getSubjectsState,
  fromSubjects.getSubjects);

/**
 * Levels Reducers
 */
export const getLevelsState = (state: State) => state.levels;
export const getLevels = createSelector(getLevelsState, fromLevels.getLevels);


/**
 * Lessons Reducers
 */
export const getLessonsState = (state: State) => state.lessons;
export const getFilteredLessons = createSelector(getLessonsState,
  fromLessons.getFilteredLessons);
export const getLessonsLoaded = createSelector(getLessonsState,
  fromLessons.getLoaded);
export const getLessonEntities = createSelector(getLessonsState,
  fromLessons.getEntities);
export const getFilteredSubjectLessons = (subject: string) => createSelector(
  getFilteredLessons,
  lessons => lessons.filter(lesson => lesson.Subject === subject));
export const getSelectedLesson = createSelector(getLessonsState,
  fromLessons.getSelected);

/**
 * Worksheets Reducers
 */
export const getWorksheetsState = (state: State) => state.worksheets;
export const getFilteredWorksheets = createSelector(getWorksheetsState,
  fromWorksheets.getFilteredWorksheets);
export const getWorksheetsLoaded = createSelector(getWorksheetsState,
  fromWorksheets.getLoaded);
export const getWorksheetEntities = createSelector(getWorksheetsState,
  fromWorksheets.getEntities);
export const getFilteredSubjectWorksheets = (subject: string) => createSelector(
  getFilteredWorksheets,
  worksheets => worksheets.filter(worksheet => worksheet.Subject === subject));
