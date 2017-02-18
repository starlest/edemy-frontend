import { Routes, RouterModule } from '@angular/router';
import {
	AboutComponent, ContactComponent, CurriculumComponent, HomeComponent,
	NotFoundPageComponent, OnlineLessonsComponent, QuizzesComponent, WorksheetsComponent
} from './components';
import { ViewLessonPageComponent } from './containers';
import { LessonExistsGuard } from './guards/lesson-exists.guard';
import { LoggedInGuard } from './guards/logged-in.guard';

export const appRoutes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'about',
		component: AboutComponent
	},
	{
		path: 'contact',
		component: ContactComponent
	},
	{
		path: 'curriculum',
		component: CurriculumComponent
	},
	{
		path: 'onlinelessons',
		component: OnlineLessonsComponent
	},
	{
		path: 'onlinelessons/:Id',
		canActivate: [LessonExistsGuard],
		component: ViewLessonPageComponent
	},
	{
		path: 'worksheets',
		canActivate: [LoggedInGuard],
		component: WorksheetsComponent
	},
	{
		path: 'quizzes',
		canActivate: [LoggedInGuard],
		component: QuizzesComponent
	},
	{
		path: '404',
		component: NotFoundPageComponent
	},
	{
		path: '**',
		redirectTo: '404',
		pathMatch: 'full'
	}
];

export const AppRoutingProviders: any[] = [];

export const AppRouting = RouterModule.forRoot(appRoutes);
