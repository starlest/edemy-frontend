import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Quiz } from '../../models/quiz/quiz';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { back } from '@ngrx/router-store';

@Component({
	selector: 'ed-quiz',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './quiz.component.html',
	styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
	@Input() quiz: Quiz;

	userSelections: any;

	constructor(private store: Store<fromRoot.State>) {
	}

	onRadioChoiceChange(questionID, choiceID) {
		console.log(questionID, choiceID);
	}

	onCheckBoxChoiceChange(questionID, choiceID, checked) {
		console.log(questionID, choiceID, checked);
	}

	onTextInputChange(questionID, value) {
		console.log(questionID, value);
	}

	onSubmit(value: any) {
		console.log('submitted', value);
		console.log(this.userSelections);
	}

	goBack() {
		this.store.dispatch(back());
	}
}
