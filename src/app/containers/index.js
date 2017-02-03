"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var selected_lesson_page_1 = require('./selected-lesson-page.component');
var view_lesson_page_1 = require('./view-lesson-page.component');
var common_1 = require('@angular/common');
var online_lesson_1 = require('../components/online-lesson/online-lesson.component');
exports.CONTAINERS = [
    selected_lesson_page_1.SelectedLessonPageComponent,
    view_lesson_page_1.ViewLessonPageComponent,
    online_lesson_1.OnlineLessonComponent
];
var ContainersModule = (function () {
    function ContainersModule() {
    }
    ContainersModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule
            ],
            declarations: exports.CONTAINERS,
            exports: exports.CONTAINERS
        })
    ], ContainersModule);
    return ContainersModule;
}());
exports.ContainersModule = ContainersModule;
