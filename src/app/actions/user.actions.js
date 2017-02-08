"use strict";
var util_1 = require('./util');
exports.ActionTypes = {
    LOAD: util_1.type('[User] Load'),
    LOAD_SUCCESS: util_1.type('[User] Load Success'),
    LOAD_FAIL: util_1.type('[User] Load Fail'),
    REMOVE: util_1.type('[User] Remove'),
    REMOVE_SUCCESS: util_1.type('[User] Remove Success'),
    REMOVE_FAIL: util_1.type('[User] Remove Fail'),
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
    function LoadFailAction() {
        this.type = exports.ActionTypes.LOAD_FAIL;
    }
    return LoadFailAction;
}());
exports.LoadFailAction = LoadFailAction;
var RemoveAction = (function () {
    function RemoveAction() {
        this.type = exports.ActionTypes.REMOVE;
    }
    return RemoveAction;
}());
exports.RemoveAction = RemoveAction;
var RemoveSuccessAction = (function () {
    function RemoveSuccessAction() {
        this.type = exports.ActionTypes.REMOVE_SUCCESS;
    }
    return RemoveSuccessAction;
}());
exports.RemoveSuccessAction = RemoveSuccessAction;
var RemoveFailAction = (function () {
    function RemoveFailAction() {
        this.type = exports.ActionTypes.REMOVE_FAIL;
    }
    return RemoveFailAction;
}());
exports.RemoveFailAction = RemoveFailAction;
