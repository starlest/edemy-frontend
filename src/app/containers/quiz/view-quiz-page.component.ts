import '@ngrx/core/add/operator/select';
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as fromRoot from '../../reducers';
import * as quizzes from '../../actions/quizzes.actions';

@Component({
	selector: 'ed-view-quiz-page',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
    <ed-selected-quiz-page></ed-selected-quiz-page>
  `
})
export class ViewQuizPageComponent implements OnDestroy {
	actionsSubscription: Subscription;

	constructor(private store: Store<fromRoot.State>, route: ActivatedRoute) {
		this.actionsSubscription = route.params
		  .select<string>('Id')
		  .map(id => new quizzes.SelectAction(id))
		  .subscribe(store);
	}

	ngOnDestroy() {
		this.actionsSubscription.unsubscribe();
	}
}
