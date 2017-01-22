import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {OnlineLessonsComponent} from './components/online-lessons/online-lessons.component';
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
    path: 'onlinelessons/:id',
    component: OnlineLessonComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

export const AppRoutingProviders: any[] = [];

export const AppRouting = RouterModule.forRoot(appRoutes);
