"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var flex_layout_1 = require('@angular/flex-layout');
var forms_1 = require('@angular/forms');
var material_1 = require('@angular/material');
var http_1 = require('@angular/http');
var app_routing_1 = require('./app.routing');
var store_1 = require('@ngrx/store');
var store_devtools_1 = require('@ngrx/store-devtools');
// import { DBModule } from '@ngrx/db';
var router_store_1 = require('@ngrx/router-store');
var app_component_1 = require('./app.component');
var reducers_1 = require('./reducers');
require('hammerjs');
var lessons_1 = require('./services/lessons.service');
var effects_1 = require('@ngrx/effects');
var lessons_2 = require('./effects/lessons.effects.ts');
var subjects_1 = require('./services/subjects.service');
var subjects_2 = require('./effects/subjects.effects.ts');
var levels_1 = require('./services/levels.service');
var levels_2 = require('./effects/levels.effects.ts');
var components_1 = require('./components');
var selected_lesson_page_1 = require('./containers/selected-lesson-page.component');
var view_lesson_page_1 = require('./containers/view-lesson-page.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                components_1.HomeComponent,
                components_1.OnlineLessonComponent,
                components_1.OnlineLessonsComponent,
                components_1.PageNotFoundComponent,
                components_1.ToolbarComponent,
                selected_lesson_page_1.SelectedLessonPageComponent,
                view_lesson_page_1.ViewLessonPageComponent
            ],
            imports: [
                app_routing_1.AppRouting,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                flex_layout_1.FlexLayoutModule.forRoot(),
                material_1.MaterialModule.forRoot(),
                http_1.HttpModule,
                /**
                 * StoreModule.provideStore is imported once in the root module, accepting
                 * a reducer function or object map of reducer functions. If passed an
                 * object of reducers, combineReducers will be run creating your
                 * application meta-reducer. This returns all providers for an @ngrx/store
                 * based application.
                 */
                store_1.StoreModule.provideStore(reducers_1.reducer),
                /**
                 * @ngrx/router-store keeps router state up-to-date in the store and uses
                 * the store as the single source of truth for the router's state.
                 */
                router_store_1.RouterStoreModule.connectRouter(),
                /**
                 * Store devtools instrument the store retaining past versions of state
                 * and recalculating new states. This enables powerful time-travel
                 * debugging.
                 *
                 * To use the debugger, install the Redux Devtools extension for either
                 * Chrome or Firefox
                 *
                 * See: https://github.com/zalmoxisus/redux-devtools-extension
                 */
                store_devtools_1.StoreDevtoolsModule.instrumentOnlyWithExtension(),
                /**
                 * EffectsModule.run() sets up the effects class to be initialized
                 * immediately when the application starts.
                 *
                 * See: https://github.com/ngrx/effects/blob/master/docs/api.md#run
                 */
                effects_1.EffectsModule.run(lessons_2.LessonsEffects),
                effects_1.EffectsModule.run(levels_2.LevelsEffects),
                effects_1.EffectsModule.run(subjects_2.SubjectsEffects)
            ],
            providers: [lessons_1.LessonsService, subjects_1.SubjectsService, levels_1.LevelsService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
