"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var fromRoot = require('../../reducers');
var ToolbarComponent = (function () {
    function ToolbarComponent(store) {
        this.store = store;
        this.menuButtonHidden = false;
        this.openMenu = new core_1.EventEmitter();
        this.title$ = store.select(fromRoot.getTitle);
    }
    __decorate([
        core_1.Input()
    ], ToolbarComponent.prototype, "menuButtonHidden", void 0);
    __decorate([
        core_1.Output()
    ], ToolbarComponent.prototype, "openMenu", void 0);
    ToolbarComponent = __decorate([
        core_1.Component({
            selector: 'ed-toolbar',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: 'toolbar.html',
            styleUrls: ['toolbar.scss']
        })
    ], ToolbarComponent);
    return ToolbarComponent;
}());
exports.ToolbarComponent = ToolbarComponent;
