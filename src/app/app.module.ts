import { AppRouting } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
	AboutComponent, CurriculumComponent, ContactComponent, HomeComponent,
	LoginComponent, NavbarComponent, NotFoundPageComponent,
	OnlineLessonComponent, OnlineLessonsComponent, UploadComponent,
	WorksheetsComponent
} from './components';
import {
	SelectedLessonPageComponent, ViewLessonPageComponent
} from './containers';
import {
	AuthService, MessagesService, LessonsService, LevelsService,
	SubjectsService, UserService, WorksheetsService
} from './services';
import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import {
	AuthEffects, UserEffects, LessonsEffects, LevelsEffects, SubjectsEffects,
	WorksheetsEffects
} from './effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import 'hammerjs';
import { AuthHttp } from './auth.http';
import { LessonExistsGuard } from './guards/lesson-exists.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { RecaptchaModule } from 'ng2-recaptcha';
import { AdminGuard } from './guards/admin.guard';
import {
	AlertModule, CollapseModule, ModalModule, DropdownModule, TabsModule
} from 'ng2-bootstrap';
import { SelectModule } from 'ng2-select';

@NgModule({
	declarations: [
		AboutComponent,
		AppComponent,
		ContactComponent,
		CurriculumComponent,
		HomeComponent,
		LoginComponent,
		NavbarComponent,
		NotFoundPageComponent,
		OnlineLessonComponent,
		OnlineLessonsComponent,
		SelectedLessonPageComponent,
		UploadComponent,
		ViewLessonPageComponent,
		WorksheetsComponent
	],
	imports: [
		AppRouting,
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		RecaptchaModule.forRoot(),

		/**
		 * ng2-bootstrap
		 */
		AlertModule.forRoot(),
		CollapseModule.forRoot(),
		ModalModule.forRoot(),
		DropdownModule.forRoot(),
		SelectModule,
		TabsModule.forRoot(),

		/**
		 * ngrx/store
		 */
		StoreModule.provideStore(reducer),
		RouterStoreModule.connectRouter(),
		EffectsModule.run(AuthEffects),
		EffectsModule.run(UserEffects),
		EffectsModule.run(LessonsEffects),
		EffectsModule.run(LevelsEffects),
		EffectsModule.run(SubjectsEffects),
		EffectsModule.run(WorksheetsEffects),

		StoreDevtoolsModule.instrumentOnlyWithExtension()
	],
	providers: [AuthHttp, AuthService, MessagesService, LessonsService,
		LevelsService, UserService, SubjectsService, WorksheetsService,
		AdminGuard, LessonExistsGuard, LoggedInGuard],
	bootstrap: [AppComponent]
})
export class AppModule {
}
