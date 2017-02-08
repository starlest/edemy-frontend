"use strict";
var reselect_1 = require('reselect');
var fromRouter = require('@ngrx/router-store');
var environment_1 = require('../../environments/environment');
/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More:
 * https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
var store_1 = require('@ngrx/store');
/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
var compose_1 = require('@ngrx/core/compose');
/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
var ngrx_store_freeze_1 = require('ngrx-store-freeze');
/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
var fromLayout = require('./layout.reducer');
var fromAuth = require('./auth.reducer');
var fromUser = require('./user-reducer');
var fromLessons = require('./lessons.reducer');
var fromLevels = require('./levels.reducer');
var fromSubjects = require('./subjects.reducer');
/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top Level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
var reducers = {
    layout: fromLayout.reducer,
    auth: fromAuth.reducer,
    user: fromUser.reducer,
    router: fromRouter.routerReducer,
    levels: fromLevels.reducer,
    lessons: fromLessons.reducer,
    subjects: fromSubjects.reducer,
};
var developmentReducer = compose_1.compose(ngrx_store_freeze_1.storeFreeze, store_1.combineReducers)(reducers);
var productionReducer = store_1.combineReducers(reducers);
function reducer(state, action) {
    if (environment_1.environment.production)
        return productionReducer(state, action);
    return developmentReducer(state, action);
}
exports.reducer = reducer;
/**
 * Layout Reducers
 */
exports.getLayoutState = function (state) { return state.layout; };
exports.getTitle = reselect_1.createSelector(exports.getLayoutState, fromLayout.getTitle);
exports.isSidenavLockedOpen = reselect_1.createSelector(exports.getLayoutState, fromLayout.isSidenavLockedOpen);
/**
 * Auth Reducers
 */
exports.getAuthState = function (state) { return state.auth; };
exports.getAuthEntity = reselect_1.createSelector(exports.getAuthState, fromAuth.getEntity);
exports.getAuthLoaded = reselect_1.createSelector(exports.getAuthState, fromAuth.getLoaded);
exports.getAuthLoading = reselect_1.createSelector(exports.getAuthState, fromAuth.getLoading);
/**
 * User Reducers
 */
exports.getUserState = function (state) { return state.user; };
exports.getUserEntity = reselect_1.createSelector(exports.getUserState, fromUser.getEntity);
exports.getUserLoaded = reselect_1.createSelector(exports.getUserState, fromUser.getLoaded);
/**
 * Lessons Reducers
 */
exports.getLessonsState = function (state) { return state.lessons; };
exports.getLessons = reselect_1.createSelector(exports.getLessonsState, fromLessons.getLessons);
exports.getLessonsLoaded = reselect_1.createSelector(exports.getLessonsState, fromLessons.getLoaded);
exports.getLessonEntities = reselect_1.createSelector(exports.getLessonsState, fromLessons.getEntities);
exports.getSubjectLessons = function (subject) { return reselect_1.createSelector(exports.getLessons, function (lessons) { return lessons.filter(function (lesson) { return lesson.Subject === subject; }); }); };
exports.getSelectedLesson = reselect_1.createSelector(exports.getLessonsState, fromLessons.getSelected);
/**
 * Levels Reducers
 */
exports.getLevelsState = function (state) { return state.levels; };
exports.getLevels = reselect_1.createSelector(exports.getLevelsState, fromLevels.getAll);
/**
 * Subjects Reducers
 */
exports.getSubjectsState = function (state) { return state.subjects; };
exports.getSubjects = reselect_1.createSelector(exports.getSubjectsState, fromSubjects.getAll);
