import { Routes, RouterModule } from '@angular/router';
import {
	AboutComponent, ContactComponent, CurriculumComponent, HomeComponent,
	LoginComponent, NotFoundPageComponent, OnlineLessonsComponent,
	UploadComponent
} from './components';
import { ViewLessonPageComponent } from './containers';
import { LessonExistsGuard } from './guards/lesson-exists.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { AdminGuard } from './guards/admin.guard';

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
		path: 'login',
		canActivate: [LoggedInGuard],
		component: LoginComponent
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
		path: 'upload',
		canActivate: [AdminGuard],
		component: UploadComponent
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
