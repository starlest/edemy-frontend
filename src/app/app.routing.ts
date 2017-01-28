import {Routes, RouterModule} from '@angular/router';
import {
  HomeComponent, NotFoundPageComponent, LoginComponent, OnlineLessonsComponent
} from './components';
import {ViewLessonPageComponent} from './containers';
import {LessonExistsGuard} from './guards/lesson-exists';
import {LoggedInGuard} from './guards/logged-in';

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
