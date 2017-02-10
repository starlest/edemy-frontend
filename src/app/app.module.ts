import { AppRouting } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {
	AboutComponent, CurriculumComponent, ContactComponent, HomeComponent,
	LoginComponent, NotFoundPageComponent, OnlineLessonComponent,
	OnlineLessonsComponent, ToolbarComponent, UploadComponent,
	WorksheetsComponent
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
import { WorksheetsService } from './services/worksheets.service';

@NgModule({
	declarations: [
		AboutComponent,
		AppComponent,
		ContactComponent,
		CurriculumComponent,
		HomeComponent,
		LoginComponent,
		NotFoundPageComponent,
		OnlineLessonComponent,
		OnlineLessonsComponent,
		SelectedLessonPageComponent,
		ToolbarComponent,
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
		FlexLayoutModule.forRoot(),
		MaterialModule.forRoot(),
		RecaptchaModule.forRoot(),

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
