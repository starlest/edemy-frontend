import {Routes, RouterModule} from '@angular/router';
import {
  HomeComponent, PageNotFoundComponent, LoginComponent, OnlineLessonsComponent
} from './components';
import {ViewLessonPageComponent} from './containers';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'onlinelessons',
    component: OnlineLessonsComponent
  },
  {
    path: 'onlinelessons/:Id',
    component: ViewLessonPageComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

export const AppRoutingProviders: any[] = [];

export const AppRouting = RouterModule.forRoot(appRoutes);
