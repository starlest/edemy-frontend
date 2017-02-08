import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../reducers';
import { Lesson } from '../models/lesson';


@Component({
	selector: 'ed-selected-lesson-page',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
    <ed-online-lesson
      [lesson]="lesson$ | async">
    </ed-online-lesson>
  `
})
export class SelectedLessonPageComponent {
	lesson$: Observable<Lesson>;

	constructor(private store: Store<fromRoot.State>) {
		this.lesson$ = store.select(fromRoot.getSelectedLesson).map(lesson => {
			if (!lesson) {
				const emptyLesson: Lesson = {
					Id: -1,
					Title: '',
					Levels: [],
					Subject: '',
					Description: '',
					VideoLink: '',
					Notes: '',
					Tutor: '',
				};
				return emptyLesson;
			}
			return lesson;
		});
	}
}
