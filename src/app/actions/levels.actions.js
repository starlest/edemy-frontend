"use strict";
var util_1 = require('./util');
exports.ActionTypes = {
    LOAD: util_1.type('[Levels] Load'),
    LOAD_SUCCESS: util_1.type('[Levels] Load Success'),
    LOAD_FAIL: util_1.type('[Levels] Load Fail')
};
var LoadAction = (function () {
    function LoadAction() {
        this.type = exports.ActionTypes.LOAD;
    }
    return LoadAction;
}());
exports.LoadAction = LoadAction;
var LoadSuccessAction = (function () {
    function LoadSuccessAction(payload) {
        this.payload = payload;
        this.type = exports.ActionTypes.LOAD_SUCCESS;
    }
    return LoadSuccessAction;
}());
exports.LoadSuccessAction = LoadSuccessAction;
var LoadFailAction = (function () {
    function LoadFailAction(payload) {
        this.payload = payload;
        this.type = exports.ActionTypes.LOAD_FAIL;
    }
    return LoadFailAction;
}());
exports.LoadFailAction = LoadFailAction;
