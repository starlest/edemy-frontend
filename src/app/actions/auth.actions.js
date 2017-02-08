"use strict";
var util_1 = require('./util');
exports.ActionTypes = {
    LOAD_FROM_SERVER: util_1.type('[Auth] Load From Server'),
    LOAD_FROM_LOCAL_STORAGE: util_1.type('[Auth] Load From Local Storage'),
    LOAD_SUCCESS: util_1.type('[Auth] Load Success'),
    LOAD_FAIL: util_1.type('[Auth] Load Fail'),
    SET: util_1.type('[Auth] Set'),
    REMOVE: util_1.type('[Auth] Remove'),
    REMOVE_SUCCESS: util_1.type('[Auth] Remove Success'),
    REMOVE_FAIL: util_1.type('[Auth] Remove Fail'),
    SCHEDULE_REFRESH: util_1.type('[Auth] Schedule Refresh'),
    SCHEDULE_REFRESH_SUCCESS: util_1.type('[Auth] Schedule Refresh Success'),
    REFRESH: util_1.type('[Auth] Refresh'),
    REFRESH_SUCCESS: util_1.type('[Auth] Refresh Success'),
    REFRESH_FAIL: util_1.type('[Auth] Refresh Fail')
};
var LoadFromServerAction = (function () {
    function LoadFromServerAction(payload) {
        this.payload = payload;
        this.type = exports.ActionTypes.LOAD_FROM_SERVER;
    }
    return LoadFromServerAction;
}());
exports.LoadFromServerAction = LoadFromServerAction;
var LoadFromLocalStorageAction = (function () {
    function LoadFromLocalStorageAction() {
        this.type = exports.ActionTypes.LOAD_FROM_LOCAL_STORAGE;
    }
    return LoadFromLocalStorageAction;
}());
exports.LoadFromLocalStorageAction = LoadFromLocalStorageAction;
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
var SetAction = (function () {
    function SetAction(payload) {
        this.payload = payload;
        this.type = exports.ActionTypes.SET;
    }
    return SetAction;
}());
exports.SetAction = SetAction;
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
var ScheduleRefreshAction = (function () {
    function ScheduleRefreshAction() {
        this.type = exports.ActionTypes.SCHEDULE_REFRESH;
    }
    return ScheduleRefreshAction;
}());
exports.ScheduleRefreshAction = ScheduleRefreshAction;
var ScheduleRefreshSuccessAction = (function () {
    function ScheduleRefreshSuccessAction() {
        this.type = exports.ActionTypes.SCHEDULE_REFRESH_SUCCESS;
    }
    return ScheduleRefreshSuccessAction;
}());
exports.ScheduleRefreshSuccessAction = ScheduleRefreshSuccessAction;
var RefreshAction = (function () {
    function RefreshAction(payload) {
        this.payload = payload;
        this.type = exports.ActionTypes.REFRESH;
    }
    return RefreshAction;
}());
exports.RefreshAction = RefreshAction;
var RefreshSuccessAction = (function () {
    function RefreshSuccessAction(payload) {
        this.payload = payload;
        this.type = exports.ActionTypes.REFRESH_SUCCESS;
    }
    return RefreshSuccessAction;
}());
exports.RefreshSuccessAction = RefreshSuccessAction;
var RefreshFailAction = (function () {
    function RefreshFailAction() {
        this.type = exports.ActionTypes.REFRESH_FAIL;
    }
    return RefreshFailAction;
}());
exports.RefreshFailAction = RefreshFailAction;
