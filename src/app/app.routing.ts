import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {OnlineLessonsComponent} from './components/online-lectures/online-lessons.component';

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
    path: '**',
    component: PageNotFoundComponent
  }
];

export const AppRoutingProviders: any[] = [];

export const AppRouting = RouterModule.forRoot(appRoutes);
