"use strict";
var router_1 = require('@angular/router');
var home_1 = require('./components/home/home.component');
var page_not_found_1 = require('./components/page-not-found/page-not-found');
var online_lessons_1 = require('./components/online-lessons/online-lessons.component');
var view_lesson_page_1 = require('./containers/view-lesson-page.component');
exports.appRoutes = [
    {
        path: '',
        component: home_1.HomeComponent
    },
    {
        path: 'home',
        component: home_1.HomeComponent
    },
    {
        path: 'onlinelessons',
        component: online_lessons_1.OnlineLessonsComponent
    },
    {
        path: 'onlinelessons/:Id',
        component: view_lesson_page_1.ViewLessonPageComponent
    },
    {
        path: '**',
        component: page_not_found_1.PageNotFoundComponent
    }
];
exports.AppRoutingProviders = [];
exports.AppRouting = router_1.RouterModule.forRoot(exports.appRoutes);
