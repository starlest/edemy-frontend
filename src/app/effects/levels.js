"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var effects_1 = require('@ngrx/effects');
var levels = require('../actions/levels');
var of_1 = require('rxjs/observable/of');
var LevelsEffects = (function () {
    function LevelsEffects(actions$, levelsService) {
        var _this = this;
        this.actions$ = actions$;
        this.levelsService = levelsService;
        this.loadLevels$ = this.actions$
            .ofType(levels.ActionTypes.LOAD)
            .startWith(new levels.LoadAction())
            .switchMap(function () {
            return _this.levelsService.get()
                .map(function (results) {
                var level_all = { Id: -1, Title: 'All' };
                var s = [level_all].concat(results.sort());
                return new levels.LoadSuccessAction(s);
            })
                .catch(function (error) { return of_1.of(new levels.LoadFailAction(error)); });
        });
    }
    __decorate([
        effects_1.Effect()
    ], LevelsEffects.prototype, "loadLevels$", void 0);
    LevelsEffects = __decorate([
        core_1.Injectable()
    ], LevelsEffects);
    return LevelsEffects;
}());
exports.LevelsEffects = LevelsEffects;
