"use strict";
var util_1 = require('./util');
exports.ActionTypes = {
    LOAD: util_1.type('[Lessons] Load'),
    LOAD_SUCCESS: util_1.type('[Lessons] Load Success'),
    LOAD_FAIL: util_1.type('[Lessons] Load Fail'),
    SELECT: util_1.type('[Lessons] Select'),
    SET_FILTER: util_1.type('[Lessons] Set Filter'),
    REMOVE_FILTER: util_1.type('[Lessons] Remove Filter')
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
var SelectAction = (function () {
    function SelectAction(payload) {
        this.payload = payload;
        this.type = exports.ActionTypes.SELECT;
    }
    return SelectAction;
}());
exports.SelectAction = SelectAction;
var SetFilter = (function () {
    function SetFilter(payload) {
        this.payload = payload;
        this.type = exports.ActionTypes.SET_FILTER;
    }
    return SetFilter;
}());
exports.SetFilter = SetFilter;
var RemoveFilter = (function () {
    function RemoveFilter() {
        this.type = exports.ActionTypes.REMOVE_FILTER;
    }
    return RemoveFilter;
}());
exports.RemoveFilter = RemoveFilter;
