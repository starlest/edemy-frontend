import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '@angular/material';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HomeComponent} from './home/home.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {OnlineLessonsComponent} from './online-lessons/online-lessons.component';
import {OnlineLessonComponent} from './online-lesson/online-lesson.component';

export const COMPONENTS = [
  OnlineLessonsComponent,
  OnlineLessonComponent,
  ToolbarComponent,
  HomeComponent,
  PageNotFoundComponent
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule {
}
