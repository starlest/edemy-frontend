"use strict";
var layout = require('../actions/layout');
var initialState = {
    title: "",
    isSidenavLockedOpen: true
};
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
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
exports.reducer = reducer;
exports.getTitle = function (state) { return state.title; };
exports.isSidenavLockedOpen = function (state) { return state.isSidenavLockedOpen; };
