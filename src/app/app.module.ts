import { AppRouting } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
	AboutComponent, CurriculumComponent, ContactComponent,
	HomeComponent, OnlineLessonComponent, OnlineLessonsComponent,
	NotFoundPageComponent, ToolbarComponent, LoginComponent
} from './components';
import {
	SelectedLessonPageComponent, ViewLessonPageComponent
} from './containers';
import {
	AuthService, MessagesService, LessonsService, LevelsService,
	SubjectsService, UserService
} from './services';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import {
	AuthEffects, UserEffects, LessonsEffects, LevelsEffects, SubjectsEffects
} from './effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import 'hammerjs';
import { AuthHttp } from './auth.http';
import { LessonExistsGuard } from './guards/lesson-exists';
import { LoggedInGuard } from './guards/logged-in';
import { RecaptchaModule } from 'ng2-recaptcha';

@NgModule({
	declarations: [
		AboutComponent,
		ContactComponent,
		CurriculumComponent,
		AppComponent,
		HomeComponent,
		OnlineLessonComponent,
		OnlineLessonsComponent,
		NotFoundPageComponent,
		LoginComponent,
		ToolbarComponent,
		SelectedLessonPageComponent,
		ViewLessonPageComponent
	],
	imports: [
		AppRouting,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		FlexLayoutModule.forRoot(),
		MaterialModule.forRoot(),
		RecaptchaModule.forRoot(),

		/**
		 * StoreModule.provideStore is imported once in the root module, accepting
		 * a reducer function or object map of reducer functions. If passed an
		 * object of reducers, combineReducers will be run creating your
		 * application meta-reducer. This returns all providers for an @ngrx/store
		 * based application.
		 */
		StoreModule.provideStore(reducer),
		/**
		 * @ngrx/router-store keeps router state up-to-date in the store and uses
		 * the store as the single source of truth for the router's state.
		 */
		RouterStoreModule.connectRouter(),
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
		StoreDevtoolsModule.instrumentOnlyWithExtension(),

		/**
		 * EffectsModule.run() sets up the effects class to be initialized
		 * immediately when the application starts.
		 *
		 * See: https://github.com/ngrx/effects/blob/master/docs/api.md#run
		 */
		EffectsModule.run(AuthEffects),
		EffectsModule.run(UserEffects),
		EffectsModule.run(LessonsEffects),
		EffectsModule.run(LevelsEffects),
		EffectsModule.run(SubjectsEffects)
	],
	providers: [AuthHttp, AuthService, MessagesService, LessonsService,
		LevelsService, UserService, SubjectsService, LessonExistsGuard,
		LoggedInGuard],
	bootstrap: [AppComponent]
})
export class AppModule {
}
