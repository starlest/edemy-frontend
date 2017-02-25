import { Routes, RouterModule } from '@angular/router';
import {
	AboutComponent, AdminDashboardComponent, AdminOverviewComponent,
	AdminStudentsComponent, AdminStudentAddComponent, ContactComponent,
	CurriculumComponent, HomeComponent, NotFoundPageComponent,
	OnlineLessonsComponent, QuizzesComponent, WorksheetsComponent
} from './components';
import {
	ViewAdminStudentDetailPageComponent, ViewAdminStudentEditPageComponent,
	ViewLessonPageComponent, ViewQuizPageComponent
} from './containers';
import { LessonExistsGuard, NotLoggedInGuard, QuizExistsGuard } from './guards';

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
		component: AdminDashboardComponent,
		children: [
			{
				path: '',
				redirectTo: 'overview',
				pathMatch: 'full'
			},
			{
				path: 'overview',
				component: AdminOverviewComponent
			},
			{
				path: 'students',
				component: AdminStudentsComponent
			},
			{
				path: 'students/add',
				component: AdminStudentAddComponent
			},
			{
				path: 'students/:Id',
				component: ViewAdminStudentDetailPageComponent
			},
			{
				path: 'students/:Id/edit',
				component: ViewAdminStudentEditPageComponent
			},
		]
	},
	{
		path: 'online-lessons',
		component: OnlineLessonsComponent
	},
	{
		path: 'online-lessons/:Id',
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
		component: ViewQuizPageComponent,
		canActivate: [QuizExistsGuard]
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

export const AppRouting = RouterModule.forRoot(appRoutes);
