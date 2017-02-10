import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../reducers';
import * as layout from '../actions/layout.actions';
import { Lesson } from '../models/lesson';


@Component({
	selector: 'ed-selected-lesson-page',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
    <ed-online-lesson
      [lesson]="lesson$ | async" [isLoggedIn]="isLoggedIn$ | async">
    </ed-online-lesson>
  `
})
export class SelectedLessonPageComponent {
	lesson$: Observable<Lesson>;
	isLoggedIn$: Observable<boolean>;

	constructor(private store: Store<fromRoot.State>) {
		this.lesson$ = store.select(fromRoot.getSelectedLesson).map(lesson => {
			// Load a placeholder empty lesson first if no lesson is loaded yet
			if (!lesson) {
				const emptyLesson: Lesson = {
					Id: -1,
					Title: '',
					Levels: [],
					Subject: '',
					Description: '',
					Notes: '',
					Tutor: '',
					Videos: []
				};
				return emptyLesson;
			}
			this.store.dispatch(new layout.ChangeTitleAction(lesson.Title));
			return lesson;
		});

		this.isLoggedIn$ =
		  store.select(fromRoot.getAuthEntity).map(entity => !!entity);
	}
}
