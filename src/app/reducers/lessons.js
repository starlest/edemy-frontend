"use strict";
var lessons = require('../actions/lessons');
var reselect_1 = require('reselect');
var initialState = {
    loaded: false,
    loading: false,
    ids: [],
    entities: {},
    selectedLessonId: null,
    filter: function (lesson) { return lesson; }
};
function reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case lessons.ActionTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true
            });
        }
        case lessons.ActionTypes.LOAD_SUCCESS: {
            var lessons_1 = action.payload;
            var lessonIds = lessons_1.map(function (lesson) { return String(lesson.Id); });
            var lessonEntities = lessons_1.reduce(function (entities, lesson) {
                return Object.assign(entities, (_a = {},
                    _a[lesson.Id] = lesson,
                    _a
                ));
                var _a;
            }, {});
            return {
                loaded: true,
                loading: false,
                ids: lessonIds,
                entities: lessonEntities,
                selectedLessonId: null,
                filter: function (lesson) { return lesson; }
            };
        }
        case lessons.ActionTypes.SELECT: {
            return Object.assign({}, state, {
                selectedLessonId: action.payload
            });
        }
        case lessons.ActionTypes.SET_FILTER:
            return Object.assign({}, state, {
                filter: action.payload
            });
        case lessons.ActionTypes.REMOVE_FILTER:
            return Object.assign({}, state, {
                filter: function (lesson) { return lesson; }
            });
        default: {
            return state;
        }
    }
}
exports.reducer = reducer;
exports.getLoaded = function (state) { return state.loaded; };
exports.getLoading = function (state) { return state.loading; };
exports.getFilter = function (state) { return state.filter; };
exports.getIds = function (state) { return state.ids; };
exports.getEntities = function (state) { return state.entities; };
exports.getSelectedId = function (state) { return state.selectedLessonId; };
exports.getSelected = reselect_1.createSelector(exports.getEntities, exports.getSelectedId, function (entities, selectedId) {
    return entities[selectedId];
});
exports.getLessons = reselect_1.createSelector(exports.getEntities, exports.getIds, exports.getFilter, function (entities, ids, filter) {
    return ids.map(function (id) { return entities[id]; }).filter(filter);
});
