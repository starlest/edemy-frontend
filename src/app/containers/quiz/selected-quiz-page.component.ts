import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Quiz } from '../../models';
import * as fromRoot from '../../reducers';

@Component({
	selector: 'ed-selected-quiz-page',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
    <ed-quiz [quiz]="quiz$ | async"></ed-quiz>
  `
})
export class SelectedQuizPageComponent {
	quiz$: Observable<Quiz>;

	constructor(private store: Store<fromRoot.State>) {
		this.quiz$ = store.select(fromRoot.getSelectedQuiz).map(quiz => {
			// Load a placeholder empty quiz first if there are no quizzes
			// loaded yet
			if (!quiz) {
				const emptyQuiz: Quiz = {
					Id: -1,
					Title: '',
					Levels: [],
					Subject: '',
					Tutor: '',
					Questions: []
				};
				return emptyQuiz;
			}
			return quiz;
		});
	}
}
