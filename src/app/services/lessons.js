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
var LessonsService = (function () {
    function LessonsService(http) {
        this.http = http;
        this.API_PATH = '';
        this.lessons = [
            {
                Id: 1,
                Title: 'Algebra',
                Level: 'Primary 4',
                Subject: 'Mathematics',
                Description: 'The basics of algebra',
                VideoLink: 'https://www.youtube.com/embed/_UR-l3QI2nE',
                Notes: '1 + 1 = 2',
                Tutor: 'Aloysius Feng'
            },
            {
                Id: 2,
                Title: 'Trigometry',
                Level: 'Secondary 4',
                Subject: 'Mathematics',
                Description: 'Advanced Trigometry',
                VideoLink: 'https://www.youtube.com/embed/_UR-l3QI2nE',
                Notes: '1 + 1 = 2',
                Tutor: 'Aloysius Feng'
            },
            {
                Id: 3,
                Title: 'Nouns',
                Level: 'Primary 3',
                Subject: 'English',
                Description: 'Mastery of nouns.',
                VideoLink: 'https://www.youtube.com/embed/_UR-l3QI2nE',
                Notes: '1 + 1 = 2',
                Tutor: 'Aloysius Feng'
            },
            {
                Id: 4,
                Title: 'Reproduction',
                Level: 'Primary 5',
                Subject: 'Science',
                Description: 'The reproduction system.',
                VideoLink: 'https://www.youtube.com/embed/_UR-l3QI2nE',
                Notes: '1 + 1 = 2',
                Tutor: 'Aloysius Feng'
            }
        ];
    }
    LessonsService.prototype.retrieveLessons = function () {
        return Observable_1.Observable.of(this.lessons);
    };
    LessonsService = __decorate([
        core_1.Injectable()
    ], LessonsService);
    return LessonsService;
}());
exports.LessonsService = LessonsService;
