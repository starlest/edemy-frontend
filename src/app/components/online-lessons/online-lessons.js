"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var fromRoot = require('../../reducers');
var layout = require('../../actions/layout');
var lessons = require('../../actions/lessons');
var util_1 = require('util');
var OnlineLessonsComponent = (function () {
    function OnlineLessonsComponent(store) {
        var _this = this;
        this.store = store;
        this.lessons$ = {};
        this.levels$ = this.store.select(fromRoot.getLevels);
        this.subjects$ = this.store.select(fromRoot.getSubjects);
        this.lessonsSubscription = this.subjects$.map(function (subjects) {
            subjects.forEach(function (subject) {
                if (subject.Title === "All")
                    return;
                _this.lessons$[subject.Title] =
                    _this.store.select(fromRoot.getSubjectLessons(subject.Title));
            });
        }).subscribe();
    }
    OnlineLessonsComponent.prototype.ngOnInit = function () {
        this.store.dispatch(new layout.ChangeTitleAction('Online Lessons'));
    };
    OnlineLessonsComponent.prototype.getSubjectSymbol = function (subject) {
        switch (subject) {
            case 'English':
                return 'text_format';
            case 'Science':
                return 'cloud';
            default:
                return 'exposure plus 1';
        }
    };
    OnlineLessonsComponent.prototype.onFilterSelectClose = function () {
        var _this = this;
        var subjectFilterCondition = (this.selectedSubjectFilter ===
            'All' || util_1.isNullOrUndefined(this.selectedSubjectFilter));
        var levelFilterCondition = (this.selectedLevelFilter === 'All' ||
            util_1.isNullOrUndefined(this.selectedLevelFilter));
        this.store.dispatch(new lessons.SetFilter(function (lesson) {
            return (subjectFilterCondition ? true :
                lesson.Subject === _this.selectedSubjectFilter) &&
                levelFilterCondition ? true : lesson.Level === _this.selectedLevelFilter;
        }));
    };
    OnlineLessonsComponent.prototype.ngOnDestroy = function () {
        this.store.dispatch(new lessons.RemoveFilter);
        this.lessonsSubscription.unsubscribe();
    };
    OnlineLessonsComponent = __decorate([
        core_1.Component({
            selector: 'ed-online-lessons',
            templateUrl: 'online-lessons.html',
            styleUrls: ['online-lessons.scss']
        })
    ], OnlineLessonsComponent);
    return OnlineLessonsComponent;
}());
exports.OnlineLessonsComponent = OnlineLessonsComponent;
