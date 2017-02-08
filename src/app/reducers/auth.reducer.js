"use strict";
var auth = require('../actions/auth.actions');
var initialState = {
    entity: null,
    loaded: false,
    loading: false,
};
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case auth.ActionTypes.LOAD_FROM_LOCAL_STORAGE:
        case auth.ActionTypes.LOAD_FROM_SERVER:
            return Object.assign({}, state, {
                entity: null,
                loaded: false,
                loading: true
            });
        case auth.ActionTypes.LOAD_SUCCESS:
            return Object.assign({}, state, {
                entity: action.payload,
                loaded: true,
                loading: false
            });
        case auth.ActionTypes.LOAD_FAIL:
            return Object.assign({}, state, {
                entity: null,
                loaded: true,
                loading: false
            });
        case auth.ActionTypes.REMOVE_SUCCESS:
            return Object.assign({}, state, {
                entity: null,
                loaded: false,
                loading: false
            });
        default:
            return state;
    }
}
exports.reducer = reducer;
exports.getEntity = function (state) { return state.entity; };
exports.getLoaded = function (state) { return state.loaded; };
exports.getLoading = function (state) { return state.loading; };
