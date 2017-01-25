"use strict";
var subjects = require('../actions/subjects');
var reselect_1 = require('reselect');
var initialState = {
    loaded: false,
    loading: false,
    ids: [],
    entities: {}
};
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case subjects.ActionTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true
            });
        }
        case subjects.ActionTypes.LOAD_SUCCESS: {
            var subjects_1 = action.payload;
            var subjectIds = subjects_1.map(function (subject) { return String(subject.Id); });
            var subjectEntities = subjects_1.reduce(function (entities, subject) {
                return Object.assign(entities, (_a = {},
                    _a[subject.Id] = subject,
                    _a
                ));
                var _a;
            }, {});
            return {
                loaded: true,
                loading: false,
                ids: subjectIds,
                entities: subjectEntities
            };
        }
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
exports.getLoaded = function (state) { return state.loaded; };
exports.getLoading = function (state) { return state.loading; };
exports.getIds = function (state) { return state.ids; };
exports.getEntities = function (state) { return state.entities; };
exports.getAll = reselect_1.createSelector(exports.getEntities, exports.getIds, function (entities, ids) { return ids.map(function (id) { return entities[id]; }); });
