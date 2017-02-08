"use strict";
var util_1 = require('./util');
exports.ActionTypes = {
    CHANGE_TITLE: util_1.type('[Layout] Change Title'),
    ON_LOCKED_OPEN_SIDENAV: util_1.type('[Layout] On Locked Open Sidenav'),
    OFF_UNLOCKED_OPEN_SIDENAV: util_1.type('[Layout] Off Locked Open Sidenav')
};
var ChangeTitleAction = (function () {
    function ChangeTitleAction(payload) {
        this.payload = payload;
        this.type = exports.ActionTypes.CHANGE_TITLE;
    }
    return ChangeTitleAction;
}());
exports.ChangeTitleAction = ChangeTitleAction;
var OnLockedOpenSidenavAction = (function () {
    function OnLockedOpenSidenavAction() {
        this.type = exports.ActionTypes.ON_LOCKED_OPEN_SIDENAV;
    }
    return OnLockedOpenSidenavAction;
}());
exports.OnLockedOpenSidenavAction = OnLockedOpenSidenavAction;
var OffLockedOpenSidenavAction = (function () {
    function OffLockedOpenSidenavAction() {
        this.type = exports.ActionTypes.OFF_UNLOCKED_OPEN_SIDENAV;
    }
    return OffLockedOpenSidenavAction;
}());
exports.OffLockedOpenSidenavAction = OffLockedOpenSidenavAction;
