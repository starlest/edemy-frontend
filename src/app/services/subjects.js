"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
require('rxjs/add/operator/map');
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
var environment_1 = require('../../environments/environment');
var SubjectsService = (function () {
    function SubjectsService(http) {
        this.http = http;
        this.baseUrl = environment_1.environment.apiEndpoint + 'subjects';
        this.subjects = [
            {
                Id: 0,
                Title: 'All'
            },
            {
                Id: 1,
                Title: 'English'
            },
            {
                Id: 2,
                Title: 'Mathematics'
            },
            {
                Id: 3,
                Title: 'Science'
            }
        ];
    }
    // calls the [GET] /api/subjects Web API method to retrieve all lessons
    SubjectsService.prototype.get = function () {
        return this.http.get(this.baseUrl)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SubjectsService.prototype.retrieveSubjects = function () {
        return Observable_1.Observable.of(this.subjects);
    };
    SubjectsService.prototype.handleError = function (error) {
        // output errors to the console.
        console.error(error);
        return Observable_1.Observable.throw(error.json().error || "Server error");
    };
    SubjectsService = __decorate([
        core_1.Injectable()
    ], SubjectsService);
    return SubjectsService;
}());
exports.SubjectsService = SubjectsService;
