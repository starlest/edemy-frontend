import { createSelector } from 'reselect';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from './auth.reducer';
import * as fromLevels from './levels.reducer';
import * as fromLessons from './lessons.reducer';
import * as fromRouter from '@ngrx/router-store';
import * as fromSchools from './schools.reducer';
import * as fromStudents from './students.reducer';
import * as fromSubjects from './subjects.reducer';
import * as fromQuizzes from './quizzes.reducer';
import * as fromUser from './user-reducer';
import * as fromWorksheets from './worksheets.reducer';

export interface State {
	auth: fromAuth.State;
	lessons: fromLessons.State;
	levels: fromLevels.State;
	quizzes: fromQuizzes.State;
	router: fromRouter.RouterState;
	schools: fromSchools.State;
	students: fromStudents.State;
	subjects: fromSubjects.State;
	user: fromUser.State;
	worksheets: fromWorksheets.State;
}

const reducers = {
	auth: fromAuth.reducer,
	lessons: fromLessons.reducer,
	levels: fromLevels.reducer,
	quizzes: fromQuizzes.reducer,
	router: fromRouter.routerReducer,
	schools: fromSchools.reducer,
	students: fromStudents.reducer,
	subjects: fromSubjects.reducer,
	user: fromUser.reducer,
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
 * Auth Reducers
 */
export const getAuthState = (state: State) => state.auth;
export const getAuthEntity = createSelector(getAuthState, fromAuth.getEntity);
export const getAuthLoaded = createSelector(getAuthState, fromAuth.getLoaded);
export const getAuthLoading = createSelector(getAuthState, fromAuth.getLoading);

/**
 * Lessons Reducers
 */
export const getLessonsState = (state: State) => state.lessons;
export const getLessonsLoaded = createSelector(getLessonsState,
  fromLessons.getLoaded);
export const getLessonEntities = createSelector(getLessonsState,
  fromLessons.getEntities);
export const getFilteredLessons = createSelector(getLessonsState,
  fromLessons.getFilteredLessons);
export const getSelectedLesson = createSelector(getLessonsState,
  fromLessons.getSelected);
export const getFilteredSubjectLessons = (subject: string) => createSelector(
  getFilteredLessons,
  lessons => lessons.filter(lesson => lesson.Subject === subject));

/**
 * Levels Reducers
 */
export const getLevelsState = (state: State) => state.levels;
export const getLevels = createSelector(getLevelsState, fromLevels.getLevels);

/**
 * Quizzes Reducers
 */
export const getQuizzesState = (state: State) => state.quizzes;
export const getQuizzesLoaded = createSelector(getQuizzesState,
  fromQuizzes.getLoaded);
export const getQuizEntities = createSelector(getQuizzesState,
  fromQuizzes.getEntities);
export const getFilteredQuizzes = createSelector(getQuizzesState,
  fromQuizzes.getFilteredQuizzes);
export const getSelectedQuiz = createSelector(getQuizzesState,
  fromQuizzes.getSelected);

/**
 * Router Reducers
 */
export const getRouterPath = (state: State) => state.router.path;

/**
 * Subjects Reducers
 */
export const getSchoolsState = (state: State) => state.schools;
export const getSchools = createSelector(getSchoolsState,
  fromSchools.getSchools);

/**
 * Students Reducers
 */
export const getStudentsState = (state: State) => state.students;
export const getStudentsLoaded = createSelector(getStudentsState,
  fromStudents.getLoaded);
export const getStudentEntities = createSelector(getStudentsState,
  fromStudents.getEntities);
export const getFileteredStudents = createSelector(getStudentsState,
  fromStudents.getFilteredStudents);
export const getSelectedStudent = createSelector(getStudentsState,
  fromStudents.getSelected);

/**
 * Subjects Reducers
 */
export const getSubjectsState = (state: State) => state.subjects;
export const getSubjects = createSelector(getSubjectsState,
  fromSubjects.getSubjects);

/**
 * User Reducers
 */
export const getUserState = (state: State) => state.user;
export const getUserEntity = createSelector(getUserState, fromUser.getEntity);
export const getUserLoaded = createSelector(getUserState, fromUser.getLoaded);

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
