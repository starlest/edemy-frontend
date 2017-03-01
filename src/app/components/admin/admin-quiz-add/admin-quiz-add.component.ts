import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../../reducers';
import { Subject } from '../../../models';

@Component({
	selector: 'ed-admin-quiz-add',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: 'admin-quiz-add.component.html',
	styleUrls: ['admin-quiz-add.component.scss']
})
export class AdminQuizAddComponent {
	addQuizForm: FormGroup;
	subjects$: Observable<Array<Subject>>;
	submitted: boolean = false;

	constructor(private store: Store<fromRoot.State>,
	            private fb: FormBuilder) {
		this.addQuizForm = this.fb.group({
			Title: ['', Validators.required],
			Subject: ['', Validators.required]
		});
		this.subjects$ = this.store.select(fromRoot.getSubjects);
	}

	addQuiz() {
		// this.submitted = true;
		// const quiz: Quiz = {
		// 	Id: 0,
		// };
		// this.store.dispatch(new qa.AddAction(quiz));
	}
}
