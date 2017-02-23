import { Routes, RouterModule } from '@angular/router';
import {
	AboutComponent, AdminDashboardComponent, ContactComponent,
	CurriculumComponent, HomeComponent, NotFoundPageComponent,
	OnlineLessonsComponent, QuizzesComponent, WorksheetsComponent
} from './components';
import { ViewLessonPageComponent, ViewQuizPageComponent } from './containers';
import { LessonExistsGuard, NotLoggedInGuard } from './guards';

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
		path: 'admin-dashboard',
		canActivate: [NotLoggedInGuard],
		component: AdminDashboardComponent
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
		canActivate: [NotLoggedInGuard],
		component: WorksheetsComponent
	},
	{
		path: 'quizzes',
		canActivate: [NotLoggedInGuard],
		component: QuizzesComponent
	},
	{
		path: 'quizzes/:Id',
		component: ViewQuizPageComponent
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
