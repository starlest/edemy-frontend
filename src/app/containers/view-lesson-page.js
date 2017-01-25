"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
require('@ngrx/core/add/operator/select');
require('rxjs/add/operator/map');
var core_1 = require('@angular/core');
var lessons = require('../actions/lessons');
var ViewLessonPageComponent = (function () {
    function ViewLessonPageComponent(store, route) {
        this.store = store;
        this.actionsSubscription = route.params
            .select('id')
            .map(function (id) { return new lessons.SelectAction(id); })
            .subscribe(store);
    }
    ViewLessonPageComponent.prototype.ngOnDestroy = function () {
        this.actionsSubscription.unsubscribe();
    };
    ViewLessonPageComponent = __decorate([
        core_1.Component({
            selector: 'ed-view-lesson-page',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <ed-selected-lesson-page></ed-selected-lesson-page>\n  "
        })
    ], ViewLessonPageComponent);
    return ViewLessonPageComponent;
}());
exports.ViewLessonPageComponent = ViewLessonPageComponent;
