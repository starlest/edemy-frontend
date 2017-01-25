"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var effects_1 = require('@ngrx/effects');
var lessons = require('../actions/lessons');
var of_1 = require('rxjs/observable/of');
var LessonsEffects = (function () {
    function LessonsEffects(actions$, lessonsService, subjectsService) {
        var _this = this;
        this.actions$ = actions$;
        this.lessonsService = lessonsService;
        this.subjectsService = subjectsService;
        this.loadLessons$ = this.actions$
            .ofType(lessons.ActionTypes.LOAD)
            .startWith(new lessons.LoadAction())
            .switchMap(function () {
            return _this.lessonsService.retrieveLessons()
                .map(function (results) { return new lessons.LoadSuccessAction(results); })
                .catch(function (error) { return of_1.of(new lessons.LoadFailAction(error)); });
        });
    }
    __decorate([
        effects_1.Effect()
    ], LessonsEffects.prototype, "loadLessons$", void 0);
    LessonsEffects = __decorate([
        core_1.Injectable()
    ], LessonsEffects);
    return LessonsEffects;
}());
exports.LessonsEffects = LessonsEffects;
