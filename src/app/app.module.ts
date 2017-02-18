import { NgModule } from '@angular/core';
import { AppRouting } from './app.routing';
import { AuthHttp } from './auth.http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {
	AboutComponent, CurriculumComponent, ContactComponent, FooterComponent,
	HeaderComponent, HomeComponent, LoginComponent, NavbarComponent,
	NotFoundPageComponent, OnlineLessonComponent, OnlineLessonsComponent,
	QuizzesComponent, WorksheetsComponent
} from './components';
import {
	SelectedLessonPageComponent, ViewLessonPageComponent
} from './containers';
import {
	AuthService, MessagesService, LessonsService, LevelsService, QuizzesService,
	SubjectsService, UserService, WorksheetsService
} from './services';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
	AuthEffects, UserEffects, LessonsEffects, LevelsEffects, QuizzesEffects,
	SubjectsEffects, WorksheetsEffects
} from './effects';
import { reducer } from './reducers';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AdminGuard } from './guards/admin.guard';
import { LessonExistsGuard } from './guards/lesson-exists.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { RecaptchaModule } from 'ng2-recaptcha';
import {
	AlertModule, CollapseModule, ModalModule, DropdownModule, PaginationModule,
	TabsModule
} from 'ng2-bootstrap';
import { SelectModule } from 'ng2-select';
import { Ng2TableModule } from 'ng2-table';

@NgModule({
	declarations: [
		AboutComponent,
		AppComponent,
		ContactComponent,
		CurriculumComponent,
		FooterComponent,
		HeaderComponent,
		HomeComponent,
		LoginComponent,
		NavbarComponent,
		NotFoundPageComponent,
		OnlineLessonComponent,
		OnlineLessonsComponent,
		SelectedLessonPageComponent,
		QuizzesComponent,
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
		Ng2TableModule,
		DropdownModule.forRoot(),
		SelectModule,
		PaginationModule.forRoot(),
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
		EffectsModule.run(QuizzesEffects),
		EffectsModule.run(SubjectsEffects),
		EffectsModule.run(WorksheetsEffects),

		StoreDevtoolsModule.instrumentOnlyWithExtension()
	],
	providers: [AuthHttp, AuthService, MessagesService, LessonsService,
		LevelsService, QuizzesService, UserService, SubjectsService,
		WorksheetsService, AdminGuard, LessonExistsGuard, LoggedInGuard],
	bootstrap: [AppComponent]
})
export class AppModule {
}
