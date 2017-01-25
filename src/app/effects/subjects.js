"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var effects_1 = require('@ngrx/effects');
var subjects = require('../actions/subjects');
var of_1 = require('rxjs/observable/of');
var SubjectsEffects = (function () {
    function SubjectsEffects(actions$, subjectsService) {
        var _this = this;
        this.actions$ = actions$;
        this.subjectsService = subjectsService;
        this.loadSubjects$ = this.actions$
            .ofType(subjects.ActionTypes.LOAD)
            .startWith(new subjects.LoadAction())
            .switchMap(function () {
            return _this.subjectsService.get()
                .map(function (results) {
                var subject_all = { Id: -1, Title: 'All' };
                var s = [subject_all].concat(results.sort());
                return new subjects.LoadSuccessAction(s);
            })
                .catch(function (error) { return of_1.of(new subjects.LoadFailAction(error)); });
        });
    }
    __decorate([
        effects_1.Effect()
    ], SubjectsEffects.prototype, "loadSubjects$", void 0);
    SubjectsEffects = __decorate([
        core_1.Injectable()
    ], SubjectsEffects);
    return SubjectsEffects;
}());
exports.SubjectsEffects = SubjectsEffects;
