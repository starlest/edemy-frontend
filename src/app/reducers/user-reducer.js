"use strict";
var user = require('../actions/user.actions');
var initialState = {
    entity: null,
    loaded: false,
    loading: false,
};
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case user.ActionTypes.LOAD:
            return Object.assign({}, state, {
                entity: null,
                loaded: false,
                loading: true
            });
        case user.ActionTypes.LOAD_SUCCESS:
            return Object.assign({}, state, {
                entity: action.payload,
                loaded: true,
                loading: false
            });
        case user.ActionTypes.LOAD_FAIL:
            return Object.assign({}, state, {
                loaded: true,
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
