import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found';
import {OnlineLessonsComponent} from './components/online-lessons/online-lessons';
import {OnlineLessonComponent} from './components/online-lesson/online-lesson.component';

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
    path: 'onlinelessons',
    component: OnlineLessonsComponent
  },
  {
    path: 'onlinelessons/:Id',
    component: OnlineLessonComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

export const AppRoutingProviders: any[] = [];

export const AppRouting = RouterModule.forRoot(appRoutes);
