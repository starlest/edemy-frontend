"use strict";
var levels = require('../actions/levels.actions');
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
        case levels.ActionTypes.LOAD: {
            return Object.assign({}, state, {
                loading: true
            });
        }
        case levels.ActionTypes.LOAD_SUCCESS: {
            var levels_1 = action.payload;
            var levelIds = levels_1.map(function (level) { return String(level.Id); });
            var levelEntities = levels_1.reduce(function (entities, level) {
                return Object.assign(entities, (_a = {},
                    _a[level.Id] = level,
                    _a
                ));
                var _a;
            }, {});
            return {
                loaded: true,
                loading: false,
                ids: levelIds,
                entities: levelEntities
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
